import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import axios from "axios";
import { getTokenX } from "../getTokenX";
import { ErrorMedStatus } from "../lib/ErrorMedStatus";
import { Counter, Histogram } from "prom-client";
import pino from "pino";
import Logger = pino.Logger;
import { logger } from "../../logger";

const NAV_CALLID = "Nav-CallId";
interface ErrorLog {
  status?: number;
  message: string;
  [NAV_CALLID]?: string;
  error?: string;
  data?: string;
}
interface Opts {
  url: string;
  prometheusPath: string;
  audience: string;
  method: "GET" | "POST" | "DELETE";
  data?: string;
  req?: NextApiRequest;
  contentType?: string;
  rawResonse?: boolean;
  noResponse?: boolean;
  bearerToken?: string;
  metricsTimer?: Histogram;
  metricsStatusCodeCounter?: Counter;
  logger?: Logger<unknown>;
}

export const tokenXApiProxy = async (opts: Opts) => {
  logger.info("starter request mot " + opts.url);

  const idportenToken = opts.bearerToken!.split(" ")[1];
  let tokenxToken;
  try {
    tokenxToken = await getTokenX(idportenToken, opts.audience);
  } catch (err: any) {
    logger.error({ msg: "getTokenXError", error: err });
  }

  const stopTimer = opts.metricsTimer
    ? opts.metricsTimer.startTimer({ path: opts.prometheusPath })
    : () => {};
  const requestId = randomUUID();
  const response = await fetch(opts.url, {
    method: opts.method,
    body: opts.data,
    headers: {
      Authorization: `Bearer ${tokenxToken}`,
      "Content-Type": opts.contentType ?? "application/json",
      [NAV_CALLID]: requestId,
    },
  });
  stopTimer();
  opts.metricsStatusCodeCounter &&
    opts.metricsStatusCodeCounter.inc({
      path: opts.prometheusPath,
      status: response.status,
    });

  if (response.status < 200 || response.status > 300) {
    const headers = response.headers.get("content-type");
    const isJson =
      headers?.includes("application/json") ||
      headers?.includes("application/problem+json");
    let data;
    try {
      data = isJson ? await response.json() : response.text();
    } catch (err: any) {
      const parseError: ErrorLog = {
        message: `unable to parse data from ${opts.url}`,
        error: err.toString(),
      };
      logger.error(parseError);
    }
    const responseErrorLog: ErrorLog = {
      message: `tokenXProxy: status for ${opts.url} er ${response.status}: ${response.statusText}.`,
      [NAV_CALLID]: data?.[NAV_CALLID],
      data,
    };
    if (response.status >= 500 || response.status === 400) {
      logger.error(responseErrorLog);
    } else if (response.status !== 404) {
      logger.warn(responseErrorLog);
    }
    throw new ErrorMedStatus(
      `tokenXProxy: status for ${opts.url} er ${response.status}.`,
      response.status,
      data?.[NAV_CALLID]
    );
  }
  logger.info(
    `Vellyket tokenXProxy-request mot ${opts.url}. Status: ${response.status}`
  );
  if (opts.noResponse) {
    return;
  }
  if (opts.rawResonse) {
    return response;
  }
  return await response.json();
};

interface AxiosOpts {
  url: string;
  prometheusPath: string;
  audience: string;
  req: NextApiRequest;
  res: NextApiResponse;
  bearerToken?: string;
  metricsTimer?: Histogram;
  metricsStatusCodeCounter?: Counter;
  logger?: Logger<unknown>;
}

export const tokenXApiStreamProxy = async (opts: AxiosOpts) => {
  const idportenToken = opts.bearerToken!.split(" ")[1];
  const tokenxToken = await getTokenX(idportenToken, opts.audience);

  logger.info("Starter opplasting av fil til " + opts.url);
  logger.info("content-type fra klient" + opts.req?.headers["content-type"]);
  const requestId = randomUUID();
  try {
    const stopTimer = opts.metricsTimer
      ? opts.metricsTimer.startTimer({ path: opts.prometheusPath })
      : () => {};
    const { data } = await axios.post(opts.url, opts.req, {
      responseType: "stream",
      headers: {
        "Content-Type": opts.req?.headers["content-type"] ?? "", // which is multipart/form-data with boundary included
        Authorization: `Bearer ${tokenxToken}`,
        [NAV_CALLID]: requestId,
      },
    });
    stopTimer();
    opts.metricsStatusCodeCounter &&
      opts.metricsStatusCodeCounter.inc({
        path: opts.prometheusPath,
        status: data.status,
      });
    logger.info("Vellykket opplasting av fil til " + opts.url);
    return data.pipe(opts.res);
  } catch (e: any) {
    if (e?.response?.status) {
      e.response.data?.pipe(opts.res);
      opts.metricsStatusCodeCounter &&
        opts.metricsStatusCodeCounter.inc({
          path: opts.prometheusPath,
          status: e.response.status,
        });
      return opts.res.status(e.response.status);
    }
    logger.error({
      msg: "tokenXAxioserror",
      error: e.toString(),
      navCallId: e?.request?.headers?.[NAV_CALLID],
    });
    return opts.res.status(500).json("tokenXAxiosProxy server error");
  }
};

import { NextApiRequest, NextApiResponse } from "next";
import { ErrorMedStatus } from "../lib/ErrorMedStatus";
import { verifyIdportenAccessToken } from "../lib/verifyIdPortenAccessToken";

type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => void | Promise<void>;

export function beskyttetApi(handler: ApiHandler): ApiHandler {
  return async function withBearerTokenHandler(req, res) {
    function send401() {
      return res.status(401).json({ message: "Access denied" });
    }
    function send500() {
      return res.status(500).json({ message: "NextJS internal server error" });
    }

    try {
      const bearerToken: string | null | undefined =
        req.headers["authorization"];
      if (!bearerToken) {
        return send401();
      }
      try {
        await verifyIdportenAccessToken(bearerToken);
      } catch (e) {
        return send401();
      }
      return handler(req, res);
    } catch (e) {
      if (e instanceof ErrorMedStatus) {
        return res.status(e.status).json({ message: e.message });
      }
      return send500();
    }
  };
}

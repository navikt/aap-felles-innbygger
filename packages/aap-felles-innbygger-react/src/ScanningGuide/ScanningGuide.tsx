import React, { useMemo } from "react";
import { BodyShort, Label } from "@navikt/ds-react";
import ScanningIcon from "./ScanningIcon";
import { Error, Success } from "@navikt/ds-icons";
import nn from "./nn";
import nb from "./nb";

export interface ScanningGuideProps {
  className?: string;
  locale?: string;
}

export const ScanningGuide = ({
  className,
  locale = "nb",
}: ScanningGuideProps) => {
  const tekster = useMemo(() => {
    switch (locale) {
      case "nn":
        return nn;
      default:
        return nb;
    }
  }, [locale]);
  return (
    <div className={`scanning-guide ${className}`}>
      <article>
        <Label as="p" spacing>
          {tekster?.alert?.takePictureTitle}
        </Label>
        <ul>
          <li>{tekster?.alert?.bulletPointTakePicture1}</li>
          <li>{tekster?.alert?.bulletPointTakePicture2}</li>
          <li>{tekster?.alert?.bulletPointTakePicture3}</li>
        </ul>
        <Label as="p" spacing>
          {tekster?.alert?.checkPictureTitle}
        </Label>
        <ul>
          <li>{tekster?.alert?.bulletPointCheckPicture1}</li>
          <li>{tekster?.alert?.bulletPointCheckPicture2}</li>
          <li>{tekster?.alert?.bulletPointCheckPicture3}</li>
        </ul>
        <Label as="p" spacing>
          {tekster?.alert?.examplesPicturesTitle}
        </Label>
      </article>
      <ul className={"scanning-examples"}>
        <li className={"scanning-example"}>
          <ScanningIcon
            status={"good"}
            title={tekster?.alert?.exampleLabelGood}
          />
          <div className="scanning-example-item">
            <span className={"scanning-example-status"}>
              <Success color={"var(--a-green-600)"} />
              <Label as="span">{tekster?.alert?.exampleLabelGood}</Label>
            </span>
            <BodyShort>{tekster?.alert?.exampleGood}</BodyShort>
          </div>
        </li>
        <li className={"scanning-example"}>
          <ScanningIcon
            status={"keystone"}
            title={tekster?.alert?.exampleLabelBad}
          />
          <div className="scanning-example-item">
            <span className={"scanning-example-status"}>
              <Error color={"var(--a-nav-red)"} />
              <Label as="span">{tekster?.alert?.exampleLabelBad}</Label>
            </span>
            <BodyShort>{tekster?.alert?.exampleKeystone}</BodyShort>
          </div>
        </li>
        <li className={"scanning-example"}>
          <ScanningIcon
            status={"horizontal"}
            title={tekster?.alert?.exampleLabelBad}
          />
          <div className="scanning-example-item">
            <span className={"scanning-example-status"}>
              <Error color={"var(--a-nav-red)"} />
              <Label as="span">{tekster?.alert?.exampleLabelBad}</Label>
            </span>
            <BodyShort>{tekster?.alert?.exampleHorizontal}</BodyShort>
          </div>
        </li>
        <li className={"scanning-example"}>
          <ScanningIcon
            status={"shadow"}
            title={tekster?.alert?.exampleLabelBad}
          />
          <div className="scanning-example-item">
            <span className={"scanning-example-status"}>
              <Error color={"var(--a-nav-red)"} />
              <Label as="span">{tekster?.alert?.exampleLabelBad}</Label>
            </span>
            <BodyShort>{tekster?.alert?.exampleShaddow}</BodyShort>
          </div>
        </li>
      </ul>
    </div>
  );
};

import React, {useMemo} from 'react';
import { Alert, BodyLong, BodyShort, Heading, Label } from '@navikt/ds-react';
import ScanningIcon from './ScanningIcon';
import { Error, Success } from '@navikt/ds-icons';
import './ScanningGuide.css';
import nn from './nb.json'
import nb from './nb.json'
interface Props {
  className?: string;
  locale?: 'nb' | 'nn'
}

export const ScanningGuide = ({ className, locale = 'nb' }: Props) => {

  const tekster = useMemo(() => {
    switch(locale) {
      case 'nn':
        return nn;
      default:
        return nb;
    }
  }, [locale]);
  return (
    <Alert className={className} variant={'info'}>
      <article>
        <Heading size={'medium'} level={'2'}>
          {tekster?.alert?.takePictureTitle}
        </Heading>
        <BodyLong>
          <ul>
            <li>
              {tekster?.alert?.bulletPointTakePicture1}
            </li>
            <li>
              {tekster?.alert?.bulletPointTakePicture2}
            </li>
            <li>
              {tekster?.alert?.bulletPointTakePicture3}
            </li>
          </ul>
        </BodyLong>
        <Heading size={'medium'} level={'2'}>
          {tekster?.alert?.checkPictureTitle}
        </Heading>
        <BodyLong>
          <ul>
            <li>
              {tekster?.alert?.bulletPointCheckPicture1}
            </li>
            <li>
              {tekster?.alert?.bulletPointCheckPicture2}
            </li>
            <li>
              {tekster?.alert.bulletPointCheckPicture3}
            </li>
          </ul>
        </BodyLong>
        <Heading size={'medium'} level={'2'}>
          {tekster?.alert?.examplesPicturesTitle}
        </Heading>
      </article>
      <div className={'scanning-examples'}>
        <div className={'scanning-example'}>
          <ScanningIcon
            status={'good'}
            title={tekster?.alert?.exampleLabelGood}
          />
          <span className={'scanning-example-status'}>
            <Success color={'var(--navds-global-color-green-600)'} />
            <Label>
              {tekster?.alert?.exampleLabelGood}
            </Label>
          </span>
          <BodyShort>
            {tekster?.alert?.exampleGood}
          </BodyShort>
        </div>
        <div className={'scanning-example'}>
          <ScanningIcon
            status={'keystone'}
            title={tekster?.alert?.exampleLabelBad}
          />
          <span className={'scanning-example-status'}>
            <Error color={'var(--navds-global-color-nav-red)'} />
            <Label>
              {tekster?.alert?.exampleLabelBad}
            </Label>
          </span>
          <BodyShort>
            {tekster?.alert?.exampleKeystone}
          </BodyShort>
        </div>
        <div className={'scanning-example'}>
          <ScanningIcon
            status={'horizontal'}
            title={tekster?.alert?.exampleLabelBad}
          />
          <span className={'scanning-example-status'}>
            <Error color={'var(--navds-global-color-nav-red)'} />
            <Label>
              {tekster?.alert?.exampleLabelBad}
            </Label>
          </span>
          <BodyShort>
            {tekster?.alert?.exampleHorizontal}
          </BodyShort>
        </div>
        <div className={'scanning-example'}>
          <ScanningIcon
            status={'shadow'}
            title={tekster?.alert?.exampleLabelBad}
          />
          <span className={'scanning-example-status'}>
            <Error color={'var(--navds-global-color-nav-red)'} />
            <Label>
              {tekster?.alert?.exampleLabelBad}
            </Label>
          </span>
          <BodyShort>
            {tekster?.alert?.exampleShaddow}
          </BodyShort>
        </div>
      </div>
    </Alert>
  );
};

import pino from 'pino';
import ecsFormat from '@elastic/ecs-pino-format';

const myEcsFormat = (formatFunc: any) => formatFunc();

export const logger = pino({
    ...myEcsFormat(ecsFormat()),
    formatters: {
        level: (label) => {
            return { level: label };
        },
    },
});
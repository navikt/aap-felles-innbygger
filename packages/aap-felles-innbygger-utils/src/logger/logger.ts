import pino, { Logger, LoggerOptions } from 'pino';
import ecsFormat from '@elastic/ecs-pino-format';

const myEcsFormat = (format: LoggerOptions) => format;

export const logger: Logger<LoggerOptions> = pino({
    ...myEcsFormat(ecsFormat()),
    formatters: {
        level: (label) => {
            return { level: label };
        },
    },
});
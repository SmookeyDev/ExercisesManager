import pino from 'pino';

let logger = pino(
    {
        formatters: {
            level: label => {
                return { level: label };
            },
        },
    },
    pino.transport({
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignore: 'pid,hostname',
            translateTime: 'yyyy-mm-dd HH:MM:ss.l',
        },
    })
);

export class Logger {
    private static shardId: number;

    public static info(message: string, obj?: any): void {
        obj ? logger.info(obj, message) : logger.info(message);
    }

    public static warn(message: string, obj?: any): void {
        obj ? logger.warn(obj, message) : logger.warn(message);
    }

    public static async error(message: string, obj?: any): Promise<void> {
        if (!obj) {
            logger.error(message);
            return;
        }

        if (typeof obj === 'string') {
            logger
                .child({
                    message: obj,
                })
                .error(message);
        } else if (obj) {
            const { body, status } = obj;

            logger
                .child({
                    status,
                    body,
                })
                .error(message);
        } else {
            logger.error(obj, message);
        }
    }

    public static setShardId(shardId: number): void {
        if (this.shardId !== shardId) {
            this.shardId = shardId;
            logger = logger.child({ shardId });
        }
    }
}
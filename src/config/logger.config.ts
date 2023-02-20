import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

const dailyOption = (level: string) => ({
  level,
  dirname: `${__dirname}/../../logs/${level}`,
  filename: `%DATE%/${level}.log`,
  maxFiles: process.env.NODE_ENV === 'local' ? 1 : 30,
  zippedArchive: true,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    nestWinstonModuleUtilities.format.nestLike('[DESKOO_SERVER', {
      prettyPrint: true,
      colors: true,
    }),
  ),
});

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'http' : 'debug',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('[DESKOO_SERVER]', {
          prettyPrint: true,
          colors: true,
        }),
      ),
    }),
    new winstonDaily(dailyOption('info')),
    new winstonDaily(dailyOption('error')),
  ],
});

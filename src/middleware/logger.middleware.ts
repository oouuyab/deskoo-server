import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { winstonLogger } from '../config/logger.config';

export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent');

    await res.on('finish', async () => {
      const { statusCode } = res;

      if (statusCode > 400) {
        winstonLogger.error(
          `[${method}]${originalUrl}(${statusCode}) ${ip} ${userAgent}`,
        );
      } else {
        winstonLogger.log(
          `[${method}]${originalUrl}(${statusCode}) ${ip} ${userAgent}`,
        );
      }
    });

    next();
  }
}

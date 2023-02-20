import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { winstonLogger } from '../config/logger.config';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    const response = (exception as HttpException).getResponse();
    const stack = exception.stack;

    const log = {
      timeStamp: new Date(),
      url: req.url,
      response,
      stack,
    };

    res.status((exception as HttpException).getStatus()).json(response);
    winstonLogger.error(log);
  }
}

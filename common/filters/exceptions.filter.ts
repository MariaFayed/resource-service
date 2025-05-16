
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

//Global Handling for exceptions
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =exception instanceof HttpException ? exception.getResponse(): 'Internal server error';

    const formattedMessage =typeof message === 'string'? { message }: typeof message === 'object'? message: { message: 'Something went wrong' };

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      statusCode: status,
      ...formattedMessage,
    });
  }
}

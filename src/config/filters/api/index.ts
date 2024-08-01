import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { baseResponse } from '@/config/common/utils';

import { exceptionsMessages, IExceptionsMessages } from './constants';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  /**
   * @fileoverview It catches any HttpException thrown by
   * the application and returns a generic response object with
   * the exception message
   * @param {HttpException} exception - HttpException - The exception that was thrown
   * @param {ArgumentsHost} host - ArgumentsHost - This is the host of the current request.
   * @returns A generic response object with a status code and a message.
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const message =
      exceptionsMessages[
        (exception.getResponse() as { message: string })[
          'message'
        ] as keyof IExceptionsMessages
      ] ?? (exception.getResponse() as { message: string })['message'];

    const resp = baseResponse({
      success: false,
      message: Array.isArray(
        (exception.getResponse() as { message: string })['message'],
      )
        ? (exception.getResponse() as { message: string })['message'][0]
        : message,
    });

    return response.status(status).json(resp);
  }
}

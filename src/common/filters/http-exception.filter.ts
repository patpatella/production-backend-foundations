import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();

      // Narrow the type safely
      let message: string;
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null && 'message' in res) {
        // Explicit type guard
        const typedRes = res as { message?: string };
        message = typedRes.message ?? 'Error';
      } else {
        message = 'Error';
      }

      response.status(status).json({
        error: {
          code: HttpStatus[status],
          message,
        },
      });
      return;
    }

    console.error('Unhandled exception:', exception);

    response.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Unexpected server error',
      },
    });
  }
}

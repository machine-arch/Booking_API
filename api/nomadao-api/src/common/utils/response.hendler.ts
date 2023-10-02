import { HttpException, HttpStatus } from '@nestjs/common';

import { getAppString } from './language.helper';

export const throwApiDownException = (language: string): never => {
  const message: string = getAppString(language, 'SERVICE_UNAVAILABLE');

  throw new HttpException(
    { statusCode: HttpStatus.SERVICE_UNAVAILABLE, message },
    HttpStatus.SERVICE_UNAVAILABLE,
  );
};

export const throwUnprocessableEntityException = (
  language: string,
  key: string,
): never => {
  const message: string = getAppString(language, key);

  throw new HttpException(
    { statusCode: HttpStatus.UNPROCESSABLE_ENTITY, message },
    HttpStatus.UNPROCESSABLE_ENTITY,
  );
};

export const throwInternalErrorException = (language: string): never => {
  const message: string = getAppString(language, 'INTERNAL_SERVER_ERROR');

  throw new HttpException(
    { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};

export const throwUnauthorisedException = (language: string): never => {
  const message: string = getAppString(language, 'INVALID_CREDENTIALS');

  throw new HttpException(
    { statusCode: HttpStatus.UNAUTHORIZED, message },
    HttpStatus.UNAUTHORIZED,
  );
};

export const throwNotFoundException = (language: string): never => {
  const message: string = getAppString(language, 'NOT_FOUND');

  throw new HttpException(
    { statusCode: HttpStatus.NOT_FOUND, message },
    HttpStatus.NOT_FOUND,
  );
};

export const throwNotEnoughtPermissionException = (language: string): never => {
  const message: string = getAppString(language, 'NOT_ENOUGH_PERMISSION');

  throw new HttpException(
    { statusCode: HttpStatus.FORBIDDEN, message },
    HttpStatus.FORBIDDEN,
  );
};

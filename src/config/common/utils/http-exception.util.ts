import { httpExceptionFilter } from '../constants';
import { IError, IHttpExceptionFIlter } from '../interfaces';

export const handlerException = ({ status = 500, ...error }: IError) => {
  return httpExceptionFilter[status as keyof IHttpExceptionFIlter](error);
};

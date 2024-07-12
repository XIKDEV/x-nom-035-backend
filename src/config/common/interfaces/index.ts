export interface IBaseResponse<T> {
  success?: boolean;
  data?: T | object;
  info?: any;
  message?: string;
}

export interface IError {
  status: number;
  message: string;
  name: string;
}

export interface IErrorNoStatus extends Omit<IError, 'status'> {}

export interface IHttpExceptionFIlter {
  401: (message: string) => never;
  403: (message: string) => never;
  500: (message: string) => never;
  409: (message: string) => never;
  422: (message: string) => never;
}

export interface ICommonId {
  id: number;
}

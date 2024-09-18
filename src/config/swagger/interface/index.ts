export interface ISwaggerItems {
  type: string;
  format?: string;
}

export interface ISwaggerOptions {
  example?: string | number | object | object[] | boolean;
  descriptionOpt?: string;
  type?: string;
  format?: string;
  items?: ISwaggerItems;
}

export interface IGuardSwagger {
  hadSecurity?: boolean;
}
export interface ISwaggerResponseOptions extends IGuardSwagger {
  module?: string;
  link?: string;
  restApi?: string;
  description?: string;
  apiConsumes?: string;
  status?: number;
  descriptionSwagger?: string;
  idModule?: number;
}

export interface ISwagger {
  id: number;
}

export interface IMethodsDecoratorSwagger {
  Get: (paths: string | string[]) => MethodDecorator;
  Post: (paths: string | string[]) => MethodDecorator;
  Patch: (paths: string | string[]) => MethodDecorator;
  Delete: (paths: string | string[]) => MethodDecorator;
}

export interface ITagSwagger extends IGuardSwagger {
  tag: string;
}

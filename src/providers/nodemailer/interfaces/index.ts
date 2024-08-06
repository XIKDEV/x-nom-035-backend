export interface IRenderTemplate {
  template: string;
  context: object;
}

export interface ISendEmail extends IRenderTemplate {
  to: string[];
  subject: string;
  from?: string;
}

export interface ISearchFileByRoute {
  route: string;
  nameFile: string;
}

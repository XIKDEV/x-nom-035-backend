import { Questions, Sections } from '@prisma/client';

export type TSectionCatalog = Pick<Sections, 'id' | 'name'>;

export type TQuestionCatalog = Pick<Questions, 'id' | 'name'>;

export interface IQuestionsCatalog {
  questions: TQuestionCatalog[];
}

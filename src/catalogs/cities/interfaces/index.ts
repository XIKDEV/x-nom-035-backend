import { Cities } from '@prisma/client';

export type TCitiesCatalog = Pick<Cities, 'id' | 'name'>;

export interface ICitiesCatalog {
  cities: TCitiesCatalog[];
}

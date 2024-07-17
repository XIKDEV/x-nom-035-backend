import { States } from '@prisma/client';

export type TStatesCatalog = Pick<States, 'id' | 'name'>;

import { Users } from '@prisma/client';

export type TUserAttributesSelected = Pick<
  Users,
  'id' | 'lastname' | 'email' | 'password'
>;

export type TUserAttributesNoPassword = Omit<
  TUserAttributesSelected,
  'password'
>;

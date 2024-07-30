import { Users } from '@prisma/client';

export type TUserAttributesSelected = Pick<
  Users,
  | 'id'
  | 'fullName'
  | 'email'
  | 'password'
  | 'name'
  | 'lastname'
  | 'idEnterprise'
  | 'idRole'
>;

export type TUserAttributesNoPassword = Omit<
  TUserAttributesSelected,
  'password'
>;

export interface IValidRoleAndEnterprise {
  idEnterprise: number;
  idRole: number;
}

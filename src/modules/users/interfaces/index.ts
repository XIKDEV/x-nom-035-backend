import {
  Modules,
  Roles,
  RolesModules,
  RolesModulesPermissions,
  Users,
} from '@prisma/client';

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

type TRolesModules = Pick<RolesModules, 'id'>;

export interface IModulesRoles extends TRolesModules {
  modules: Pick<
    Modules,
    'id' | 'name' | 'component' | 'description' | 'icon' | 'route' | 'idType'
  >;
}

export type TRolesModulePermissionsSelected = Pick<
  RolesModulesPermissions,
  'id' | 'idPermission'
>;

export interface IRolesModulesPermissionsBase extends IModulesRoles {
  rolesModulesPermissions: TRolesModulePermissionsSelected[];
}

export interface IRolesModulesPermissionsMapping extends TRolesModules {
  create: boolean;
  update: boolean;
  read: boolean;
  delete: boolean;
}

export interface IRoles extends Pick<Roles, 'name' | 'id' | 'description'> {
  rolesModules: IRolesModulesPermissionsMapping[];
}

export interface ILoginResponse extends TUserAttributesSelected {
  roles: IRoles;
}

export interface IValidRoleAndEnterprise {
  idEnterprise: number;
  idRole: number;
}

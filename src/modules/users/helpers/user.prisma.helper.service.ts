import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { RolesPrismaService } from '@/catalogs';
import {
  IPrismaOptions,
  IPrismaUpdate,
  IPrismaWhereFilter,
  PrismaService,
  unauthorizedExceptionMessages,
} from '@/config';

import {
  IValidRoleAndEnterprise,
  TUserAttributesNoPassword,
  TUserAttributesSelected,
} from '../interfaces';
import { userMessages } from '../messages';

@Injectable()
export class UserPrismaService {
  constructor(
    private prisma: PrismaService,
    private readonly rolePrismaService: RolesPrismaService,
  ) {}

  async findByEmail(email: string): Promise<TUserAttributesSelected | null> {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
        active: true,
      },
      select: {
        id: true,
        idRole: true,
        idEnterprise: true,
        fullName: true,
        email: true,
        password: true,
        name: true,
        lastname: true,
        roles: {
          select: {
            id: true,
            rolesModules: {
              select: {
                id: true,
                modules: {
                  select: {
                    id: true,
                    name: true,
                    component: true,
                    description: true,
                    icon: true,
                    route: true,
                  },
                },
                rolesModulesPermissions: {
                  select: {
                    id: true,
                    idPermission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        unauthorizedExceptionMessages.invalidCredentials,
      );
    }

    return user;
  }

  async findById(id: number): Promise<TUserAttributesNoPassword | null> {
    const user = await this.prisma.users.findFirst({
      where: {
        id,
        active: true,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        name: true,
        lastname: true,
        idRole: true,
        idEnterprise: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException(userMessages.userNotFound);
    }

    return user;
  }

  async findMany({
    skip,
    take,
    where,
  }: IPrismaOptions<Prisma.UsersWhereInput>): Promise<
    TUserAttributesNoPassword[]
  > {
    return await this.prisma.users.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        name: true,
        lastname: true,
        idEnterprise: true,
        idRole: true,
      },
      skip,
      take,
      where: {
        active: true,
        ...where,
      },
    });
  }

  async update({
    data,
    where,
  }: IPrismaUpdate<
    Prisma.UsersWhereUniqueInput,
    Prisma.XOR<Prisma.UsersUpdateInput, Prisma.UsersUncheckedUpdateInput>
  >): Promise<TUserAttributesNoPassword> {
    const { id, email, lastname, fullName, name, idRole, idEnterprise } =
      await this.prisma.users.update({
        where,
        data,
        select: {
          id: true,
          email: true,
          fullName: true,
          name: true,
          lastname: true,
          idRole: true,
          idEnterprise: true,
        },
      });

    return {
      id,
      email,
      fullName,
      name,
      lastname,
      idRole,
      idEnterprise,
    };
  }

  async delete({
    where,
  }: IPrismaWhereFilter<Prisma.UsersWhereUniqueInput>): Promise<void> {
    await this.prisma.users.update({
      where,
      data: {
        active: false,
      },
      select: {
        active: true,
      },
    });
  }

  async validRoleAndEnterprise({
    idRole,
    idEnterprise,
  }: IValidRoleAndEnterprise): Promise<void> {
    await this.rolePrismaService.findById(idRole);

    const enterprise = await this.prisma.enterprises.findUnique({
      where: {
        id: idEnterprise,
        active: true,
      },
    });

    if (!enterprise) {
      throw new ConflictException(userMessages.enterpriseNotFound);
    }
  }
}

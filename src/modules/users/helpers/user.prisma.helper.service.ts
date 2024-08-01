import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  IPrismaOptions,
  PrismaService,
  unauthorizedExceptionMessages,
} from '@/config';

import {
  TUserAttributesNoPassword,
  TUserAttributesSelected,
} from '../interfaces';

@Injectable()
export class UserPrismaService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<TUserAttributesSelected | null> {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        password: true,
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
      },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        unauthorizedExceptionMessages.invalidCredentials,
      );
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
      },
      skip,
      take,
      where,
    });
  }
}

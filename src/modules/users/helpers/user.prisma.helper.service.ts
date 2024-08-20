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
import { EnterprisesPrismaService } from '@/modules/enterprises';

import { CreateUserDto } from '../dto';
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
    private readonly enterprisesPrismaService: EnterprisesPrismaService,
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
            name: true,
            description: true,
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
                    idType: true,
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

  async validateDuplicate(email: string): Promise<void> {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
        active: true,
      },
    });

    if (user) {
      throw new ConflictException(userMessages.userDuplicate);
    }
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
        enterprises: {
          select: {
            legalRepresentative: true,
            businessName: true,
            image: true,
          },
        },
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
    if (idRole) {
      await this.rolePrismaService.findById(idRole);
    }

    if (idEnterprise) {
      await this.enterprisesPrismaService.validate(idEnterprise);
    }
  }

  private generatePassword(): string {
    return Math.random().toString(36).slice(-8);
  }

  async create(data: CreateUserDto): Promise<TUserAttributesSelected> {
    const passwordRandom = this.generatePassword();

    const {
      id,
      email,
      fullName,
      name,
      lastname,
      idRole,
      idEnterprise,
      password,
    } = await this.prisma.users.create({
      data: {
        ...data,
        password: passwordRandom,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        name: true,
        lastname: true,
        idRole: true,
        idEnterprise: true,
        password: true,
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
      password,
    };
  }
}

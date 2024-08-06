import { Injectable } from '@nestjs/common';

import {
  baseResponse,
  FindAllDto,
  getPaginationFields,
  getWhereFilter,
  handlerException,
  IBaseResponse,
  IdDto,
} from '@/config';
import { templates } from '@/providers/nodemailer/constants';
import { ISendNewUser } from '@/providers/nodemailer/interfaces';
import { NodemailerService } from '@/providers/nodemailer/services';

import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserPrismaService } from '../helpers';
import { TUserAttributesNoPassword } from '../interfaces';

@Injectable()
export class UserService {
  constructor(
    private readonly userPrismaService: UserPrismaService,
    private readonly nodemailerService: NodemailerService,
  ) {}

  async findAll({
    like,
    likeField,
    page,
    results,
  }: FindAllDto): Promise<IBaseResponse<TUserAttributesNoPassword[]>> {
    try {
      const { skip, take } = getPaginationFields({ page, results });

      const where = getWhereFilter({ likeField, like });

      const data = await this.userPrismaService.findMany({
        skip,
        take,
        where,
      });

      return baseResponse({
        data,
      });
    } catch (error) {
      return handlerException(error);
    }
  }

  async create({ email, idEnterprise, idRole, lastname, name }: CreateUserDto) {
    try {
      await this.userPrismaService.validRoleAndEnterprise({
        idEnterprise,
        idRole,
      });

      await this.userPrismaService.validateDuplicate(email);

      const { password, ...user } = await this.userPrismaService.create({
        email,
        idEnterprise,
        idRole,
        lastname,
        name,
      });

      await this.nodemailerService.sendEmail<ISendNewUser>({
        subject: 'Bienvenido a la plataforma',
        to: [user.email],
        template: templates.email,
        context: {
          email: user.email,
          password,
        },
      });

      return baseResponse({
        data: user,
      });
    } catch (error) {
      return handlerException(error);
    }
  }

  async update({
    lastname,
    name,
    email,
    idRole,
    idEnterprise,
    id,
  }: UpdateUserDto): Promise<IBaseResponse<TUserAttributesNoPassword>> {
    try {
      const where = { id };

      await this.userPrismaService.validRoleAndEnterprise({
        idEnterprise,
        idRole,
      });

      await this.userPrismaService.findById(id);

      const data = await this.userPrismaService.update({
        where,
        data: {
          lastname,
          name,
          email,
          idEnterprise,
          idRole,
        },
      });

      return baseResponse({
        data,
      });
    } catch (error) {
      return handlerException(error);
    }
  }

  async delete({ id }: IdDto): Promise<IBaseResponse<unknown>> {
    try {
      const where = { id };

      await this.userPrismaService.findById(id);

      await this.userPrismaService.delete({
        where,
      });

      return baseResponse({});
    } catch (error) {
      return handlerException(error);
    }
  }
}

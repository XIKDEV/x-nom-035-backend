import { Injectable } from '@nestjs/common';

import {
  baseResponse,
  FindAllDto,
  getPaginationFields,
  getWhereFilter,
  handlerException,
  IBaseResponse,
} from '@/config';

import { UserPrismaService } from '../helpers';
import { TUserAttributesNoPassword } from '../interfaces';

@Injectable()
export class UserService {
  constructor(private readonly userPrismaService: UserPrismaService) {}

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
}

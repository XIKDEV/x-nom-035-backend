import { Injectable } from '@nestjs/common';

import {
  FindAllDto,
  getPaginationFields,
  getWhereFilter,
  handlerException,
} from '@/config';

import { EnterprisesPrismaService } from '../helpers';

@Injectable()
export class EnterprisesService {
  constructor(
    private readonly enterprisesPrismaService: EnterprisesPrismaService,
  ) {}

  async findAll({ like, likeField, page, results }: FindAllDto) {
    try {
      const { skip, take } = getPaginationFields({ page, results });

      const where = getWhereFilter({ like, likeField });

      const enterprises = await this.enterprisesPrismaService.findMany({
        skip,
        take,
        where,
      });

      return enterprises;
    } catch (error) {
      return handlerException(error);
    }
  }
}

import { Injectable } from '@nestjs/common';

import { CitiesPrismaService } from '@/catalogs';
import {
  baseResponse,
  FindAllDto,
  getPaginationFields,
  getWhereFilter,
  handlerException,
  IBaseResponse,
  IGlobalId,
} from '@/config';

import { IdDto } from '../../../config/common/dto/id.dto';
import { CreateEnterpriseDto } from '../dtos';
import { EnterprisesPrismaService } from '../helpers';

@Injectable()
export class EnterprisesService {
  constructor(
    private readonly enterprisesPrismaService: EnterprisesPrismaService,
    private readonly citiesPrismaService: CitiesPrismaService,
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

  async create({
    idCity,
    ...createEnterpriseDto
  }: CreateEnterpriseDto): Promise<IBaseResponse<IGlobalId>> {
    try {
      await this.citiesPrismaService.validateIdCity(idCity);

      const enterprise = await this.enterprisesPrismaService.create({
        ...createEnterpriseDto,
        idCity,
      });

      return baseResponse({ data: { id: enterprise.id } });
    } catch (error) {
      return handlerException(error);
    }
  }

  async update({
    idCity,
    id,
    ...createEnterpriseDto
  }: CreateEnterpriseDto & IdDto): Promise<IBaseResponse<void>> {
    try {
      await this.citiesPrismaService.validateIdCity(idCity);

      await this.enterprisesPrismaService.update({
        data: {
          ...createEnterpriseDto,
          idCity,
        },
        where: {
          id,
        },
      });

      return baseResponse({});
    } catch (error) {
      return handlerException(error);
    }
  }
}

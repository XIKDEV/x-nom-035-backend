import { Injectable } from '@nestjs/common';
import { Enterprises } from '@prisma/client';

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

import { CreateEnterpriseDto, UpdateEnterpriseDto } from '../dtos';
import { EnterprisesPrismaService } from '../helpers';
import { FirebaseService } from '@/providers/firebase';

@Injectable()
export class EnterprisesService {
  constructor(
    private readonly enterprisesPrismaService: EnterprisesPrismaService,
    private readonly citiesPrismaService: CitiesPrismaService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async findAll({
    like,
    likeField,
    page,
    results,
  }: FindAllDto): Promise<IBaseResponse<Enterprises>> {
    try {
      const { skip, take } = getPaginationFields({ page, results });

      const where = getWhereFilter({ like, likeField });

      const enterprises = await this.enterprisesPrismaService.findMany({
        skip,
        take,
        where,
      });

      return baseResponse({ data: enterprises });
    } catch (error) {
      return handlerException(error);
    }
  }

  async create(
    { idCity, ...createEnterpriseDto }: CreateEnterpriseDto,
    logo: Express.Multer.File,
  ): Promise<IBaseResponse<IGlobalId>> {
    try {
      await this.citiesPrismaService.validateIdCity(idCity);

      const url = await this.firebaseService.uploadImages({
        logo,
        path: `enterprises/${createEnterpriseDto.businessName}/logo/`,
      });

      const enterprise = await this.enterprisesPrismaService.create({
        ...createEnterpriseDto,
        idCity,
        image: url,
      });

      return baseResponse({ data: { id: enterprise.id } });
    } catch (error) {
      return handlerException(error);
    }
  }

  async update(
    { idCity, id, ...createEnterpriseDto }: UpdateEnterpriseDto,
    logo: Express.Multer.File,
  ): Promise<IBaseResponse<void>> {
    try {
      await this.citiesPrismaService.validateIdCity(idCity);

      const enterprise = await this.enterprisesPrismaService.validate(id);

      if (enterprise.image || logo === null) {
        await this.firebaseService.deleteImage({
          path: enterprise.image,
        });
      }

      let url = undefined;

      if (logo) {
        url = await this.firebaseService.uploadImages({
          path: `enterprises/${createEnterpriseDto.businessName}/logo/`,
          logo,
        });
      }

      await this.enterprisesPrismaService.update({
        data: {
          ...createEnterpriseDto,
          idCity,
          image: url,
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

/* eslint-disable no-undef */
import { Injectable } from '@nestjs/common';

import { TypeTestPrismaService } from '@/catalogs';
import { baseResponse, handlerException } from '@/config';
import { EnterprisesPrismaService } from '@/modules/enterprises';

import { FirebaseService } from '../../../providers/firebase/services/firebase.service';
import { CreateContractsDto } from '../dtos';
import { ContractsPrismaService } from './contracts.prisma.service';

@Injectable()
export class ContractsService {
  constructor(
    private readonly enterprisePrismaService: EnterprisesPrismaService,
    private readonly contractsPrismaService: ContractsPrismaService,
    private readonly firebaseService: FirebaseService,
    private readonly typeTestPrismaService: TypeTestPrismaService,
  ) {}

  async create(
    {
      idEnterprise,
      title,
      endDate,
      startDate,
      idTypeTest,
      ...createContractsDto
    }: CreateContractsDto,
    contract: Express.Multer.File,
  ) {
    try {
      await this.typeTestPrismaService.validate(idTypeTest);

      const enterprise =
        await this.enterprisePrismaService.validate(idEnterprise);

      const url = await this.firebaseService.uploadImages({
        logo: contract,
        path: `enterprises/${enterprise.businessName}/contracts/${startDate}/${title}`,
      });

      await this.contractsPrismaService.create({
        ...createContractsDto,
        idEnterprise,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        title,
        url,
        idTypeTest,
      });

      return baseResponse({});
    } catch (error) {
      return handlerException(error);
    }
  }
}

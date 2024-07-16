import { Injectable } from '@nestjs/common';

import { ICatalogsAttributes, mappingCatalogs, PrismaService } from '@/config';

import { TTypeTest } from '../interfaces';

@Injectable()
export class TypeTestPrismaService {
  constructor(private prismaService: PrismaService) {}

  async catalog(): Promise<ICatalogsAttributes[]> {
    const typeTest = await this.prismaService.typeTest.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const mappingTypeTest = mappingCatalogs<TTypeTest>({
      data: typeTest,
    });

    return mappingTypeTest;
  }
}

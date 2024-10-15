import { ConflictException, Injectable } from '@nestjs/common';

import { ICatalogsAttributes, mappingCatalogs, PrismaService } from '@/config';

import { TTypeTest } from '../interfaces';
import { typeTestMessages } from '../messages';

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

  async validate(id: number): Promise<void> {
    const typeTest = await this.prismaService.typeTest.findUnique({
      where: {
        id,
      },
    });

    if (!typeTest) {
      throw new ConflictException(typeTestMessages.notFound);
    }
  }
}

import { Injectable } from '@nestjs/common';

import { mappingCatalogs, PrismaService } from '@/config';

import { IQuestionsCatalog, TSectionCatalog } from '../interfaces';

@Injectable()
export class SectionsPrismaService {
  constructor(private prisma: PrismaService) {}

  async catalog() {
    const sections = await this.prisma.sections.findMany({
      select: {
        id: true,
        name: true,
        idTypeTest: true,
        questions: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const mappingSections = mappingCatalogs<
      TSectionCatalog & IQuestionsCatalog
    >({
      data: sections,
    }).map(({ questions, ...section }) => ({
      ...section,
      questions: mappingCatalogs({
        data: questions,
      }),
    }));

    return mappingSections;
  }
}

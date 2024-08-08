import { Injectable } from '@nestjs/common';
import { Enterprises, Prisma } from '@prisma/client';

import { IPrismaOptions, PrismaService } from '@/config';

@Injectable()
export class EnterprisesPrismaService {
  constructor(private prisma: PrismaService) {}

  async findMany({
    skip,
    take,
    where,
  }: IPrismaOptions<Prisma.EnterprisesWhereInput>): Promise<Enterprises[]> {
    return await this.prisma.enterprises.findMany({
      skip,
      take,
      where,
    });
  }
}

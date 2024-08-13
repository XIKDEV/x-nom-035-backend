import { Injectable } from '@nestjs/common';
import { Enterprises, Prisma } from '@prisma/client';

import { IPrismaOptions, IPrismaUpdate, PrismaService } from '@/config';

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

  async create(
    data: Prisma.EnterprisesUncheckedCreateInput,
  ): Promise<Enterprises> {
    return await this.prisma.enterprises.create({
      data,
    });
  }

  async update({
    data,
    where,
  }: IPrismaUpdate<
    Prisma.EnterprisesWhereUniqueInput,
    Prisma.XOR<
      Prisma.EnterprisesUpdateInput,
      Prisma.EnterprisesUncheckedUpdateInput
    >
  >): Promise<Enterprises> {
    return await this.prisma.enterprises.update({
      data,
      where,
    });
  }
}

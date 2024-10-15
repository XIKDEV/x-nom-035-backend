import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { IPrismaOptions, PrismaService } from '@/config';

import { ICreateContractsDto } from '../interfaces';

@Injectable()
export class ContractsPrismaService {
  constructor(private prisma: PrismaService) {}

  async create(createContractsDto: ICreateContractsDto): Promise<void> {
    await this.prisma.contracts.create({
      data: createContractsDto,
    });
  }

  async findMany(
    options: IPrismaOptions<Prisma.ContractsWhereInput>,
  ): Promise<ICreateContractsDto[]> {
    return await this.prisma.contracts.findMany(options);
  }
}

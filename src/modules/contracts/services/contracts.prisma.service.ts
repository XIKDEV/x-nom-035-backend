import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/config';

import { ICreateContractsDto } from '../interfaces';

@Injectable()
export class ContractsPrismaService {
  constructor(private prisma: PrismaService) {}

  async create(createContractsDto: ICreateContractsDto) {
    return await this.prisma.contracts.create({
      data: createContractsDto,
    });
  }
}

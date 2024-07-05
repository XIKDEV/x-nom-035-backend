import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';

import { PrismaService } from '@/config';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Users[]> {
    return await this.prisma.users.findMany();
  }
}

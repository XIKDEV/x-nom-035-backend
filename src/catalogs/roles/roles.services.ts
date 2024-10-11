import { PrismaService } from '@/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create({name, descripction, active}: ) {}
}

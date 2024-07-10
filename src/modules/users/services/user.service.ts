import { Injectable } from '@nestjs/common';

import { UserPrismaService } from '../helpers';
import { TUserAttributesNoPassword } from '../interfaces';

@Injectable()
export class UserService {
  constructor(private readonly userPrismaService: UserPrismaService) {}

  async findAll(): Promise<TUserAttributesNoPassword[]> {
    return await this.userPrismaService.findMany();
  }
}

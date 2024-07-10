import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { UserController } from './controllers';
import { UserPrismaService } from './helpers';
import { UserService } from './services';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserPrismaService],
  controllers: [UserController],
  exports: [UserPrismaService],
})
export class UserModule {}

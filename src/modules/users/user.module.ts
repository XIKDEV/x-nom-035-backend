import { forwardRef, Module } from '@nestjs/common';

import { PrismaModule } from '@/config';
import { AuthModule } from '@/providers';

import { UserController } from './controllers';
import { UserPrismaService } from './helpers';
import { UserService } from './services';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  providers: [UserService, UserPrismaService],
  controllers: [UserController],
  exports: [UserPrismaService],
})
export class UserModule {}

import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { UserController } from './controllers';
import { UserService } from './services';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}

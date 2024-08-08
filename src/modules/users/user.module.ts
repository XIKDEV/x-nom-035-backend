import { Module } from '@nestjs/common';

import { RolesModule } from '@/catalogs';
import { PrismaModule } from '@/config';
import { NodemailerModule } from '@/providers/nodemailer/nodemailer.module';

import { UserController } from './controllers';
import { UserPrismaService } from './helpers';
import { UserService } from './services';

@Module({
  imports: [PrismaModule, RolesModule, NodemailerModule],
  providers: [UserService, UserPrismaService],
  controllers: [UserController],
  exports: [UserPrismaService],
})
export class UserModule {}

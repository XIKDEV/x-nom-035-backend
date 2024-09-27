import { Module } from '@nestjs/common';

import { RolesModule } from '@/catalogs';
import { PrismaModule } from '@/config';
import { NodemailerModule } from '@/providers/nodemailer/nodemailer.module';

import { EnterprisesModule } from '../enterprises';
import { UserController } from './controllers';
import { UserPrismaService } from './helpers';
import { UserService } from './services';
import { BcryptModule } from '@/providers';

@Module({
  imports: [
    PrismaModule,
    RolesModule,
    NodemailerModule,
    EnterprisesModule,
    BcryptModule,
  ],
  providers: [UserService, UserPrismaService],
  controllers: [UserController],
  exports: [UserPrismaService],
})
export class UserModule {}

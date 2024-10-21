import { forwardRef, Module } from '@nestjs/common';

import { RolesModule } from '@/catalogs';
import { PrismaModule } from '@/config';
import { BcryptModule, NodemailerModule } from '@/providers';

import { EnterprisesModule } from '../enterprises';
import { UserController } from './controllers';
import { UserPrismaService } from './helpers';
import { UserService } from './services';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => RolesModule),
    NodemailerModule,
    EnterprisesModule,
    BcryptModule,
  ],
  providers: [UserService, UserPrismaService],
  controllers: [UserController],
  exports: [UserPrismaService],
})
export class UserModule {}

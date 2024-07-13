import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './modules';
import { AuthModule } from './providers';
import { RolesModule } from './catalogs/roles/roles.module';
import { ModulesModule } from './catalogs/modules/modules.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    RolesModule,
    ModulesModule,
  ],
})
export class AppModule {}

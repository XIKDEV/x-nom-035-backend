import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  CatalogsModule,
  ModulesModule,
  PermissionsModule,
  RolesModule,
  StatesModule,
  TypesModuleModule,
  TypeTestModule,
} from './catalogs';
import { ContractsModule, EnterprisesModule, UserModule } from './modules';
import { AuthModule, FirebaseModule, NodemailerModule } from './providers';
import { SectionsModule } from './catalogs/sections/sections.module';

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
    PermissionsModule,
    TypeTestModule,
    TypesModuleModule,
    StatesModule,
    CatalogsModule,
    NodemailerModule,
    EnterprisesModule,
    FirebaseModule,
    ContractsModule,
    SectionsModule,
  ],
})
export class AppModule {}

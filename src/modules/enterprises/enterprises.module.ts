import { Module } from '@nestjs/common';

import { CitiesModule } from '@/catalogs';
import { PrismaModule } from '@/config';

import { EnterprisesController } from './controllers';
import { EnterprisesService } from './services';
import { EnterprisesPrismaService } from './helpers/enterprises.prisma.helper.service';
import { FirebaseModule } from '@/providers/firebase';

@Module({
  controllers: [EnterprisesController],
  providers: [EnterprisesService, EnterprisesPrismaService],
  imports: [PrismaModule, CitiesModule, FirebaseModule],
  exports: [EnterprisesPrismaService],
})
export class EnterprisesModule {}

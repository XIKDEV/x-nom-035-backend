import { Module } from '@nestjs/common';

import { CitiesModule } from '@/catalogs';
import { PrismaModule } from '@/config';

import { EnterprisesController } from './controllers';
import { EnterprisesService } from './services';

@Module({
  controllers: [EnterprisesController],
  providers: [EnterprisesService],
  imports: [PrismaModule, CitiesModule],
})
export class EnterprisesModule {}

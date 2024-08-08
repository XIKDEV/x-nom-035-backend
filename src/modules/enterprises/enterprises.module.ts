import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { EnterprisesController } from './controllers';
import { EnterprisesService } from './services';

@Module({
  controllers: [EnterprisesController],
  providers: [EnterprisesService],
  imports: [PrismaModule],
})
export class EnterprisesModule {}

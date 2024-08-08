import { Controller } from '@nestjs/common';

import { EnterprisesService } from '../services';

@Controller('enterprises')
export class EnterprisesController {
  constructor(private readonly enterprisesService: EnterprisesService) {}
}

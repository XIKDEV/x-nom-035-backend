import { Body, Query } from '@nestjs/common';

import {
  apiConsumes as apiConsumesConstants,
  apiMethods,
  FindAllDto,
  GuardSwagger,
  IdDto,
  Swagger,
} from '@/config';

import { CreateEnterpriseDto } from '../dtos';
import { EnterprisesService } from '../services';

@GuardSwagger({
  tag: 'enterprises',
})
export class EnterprisesController {
  constructor(private readonly enterprisesService: EnterprisesService) {}

  @Swagger({
    restApi: apiMethods.get,
  })
  findMany(@Query() query: FindAllDto) {
    return this.enterprisesService.findAll(query);
  }

  @Swagger({
    restApi: apiMethods.post,
    apiConsumes: apiConsumesConstants.multipart,
  })
  create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterprisesService.create(createEnterpriseDto);
  }

  @Swagger({
    restApi: apiMethods.patch,
    apiConsumes: apiConsumesConstants.multipart,
  })
  update(@Body() updateEnterpriseDto: CreateEnterpriseDto & IdDto) {
    return this.enterprisesService.update(updateEnterpriseDto);
  }
}

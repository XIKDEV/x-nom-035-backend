import { Body, Query, UploadedFile, UseInterceptors } from '@nestjs/common';

import {
  apiConsumes as apiConsumesConstants,
  apiMethods,
  FindAllDto,
  GuardSwagger,
  Swagger,
} from '@/config';

import { CreateEnterpriseDto, UpdateEnterpriseDto } from '../dtos';
import { EnterprisesService } from '../services';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('logo'))
  create(
    @Body() createEnterpriseDto: CreateEnterpriseDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return this.enterprisesService.create(createEnterpriseDto, logo);
  }

  @Swagger({
    restApi: apiMethods.patch,
    apiConsumes: apiConsumesConstants.multipart,
  })
  @UseInterceptors(FileInterceptor('logo'))
  update(
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return this.enterprisesService.update(updateEnterpriseDto, logo);
  }
}

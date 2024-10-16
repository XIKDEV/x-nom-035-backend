/* eslint-disable no-undef */
import {
  Body,
  HttpStatus,
  ParseFilePipeBuilder,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { apiConsumes, apiMethods, GuardSwagger, Swagger } from '@/config';

import { CreateContractsDto } from '../dtos';
import { ContractsService } from '../services';

@GuardSwagger({
  tag: 'contracts',
})
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Swagger({
    restApi: apiMethods.post,
    apiConsumes: apiConsumes.multipart,
  })
  @UseInterceptors(FileInterceptor('contract'))
  create(
    @Body() createContractsDto: CreateContractsDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'pdf' })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    contract: Express.Multer.File,
  ) {
    return this.contractsService.create(createContractsDto, contract);
  }
}

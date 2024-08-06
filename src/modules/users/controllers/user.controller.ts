import { Body, Query } from '@nestjs/common';

import {
  apiMethods,
  FindAllDto,
  GuardSwagger,
  IdDto,
  Swagger,
} from '@/config/';

import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserService } from '../services';

@GuardSwagger({
  tag: 'users',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Swagger({
    restApi: apiMethods.get,
  })
  findAll(@Query() findAllDto: FindAllDto) {
    return this.userService.findAll(findAllDto);
  }

  @Swagger({
    restApi: apiMethods.patch,
  })
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Swagger({
    restApi: apiMethods.post,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Swagger({
    restApi: apiMethods.delete,
  })
  delete(@Body() idDto: IdDto) {
    return this.userService.delete(idDto);
  }
}

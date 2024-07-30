import { Query } from '@nestjs/common';

import { apiMethods, FindAllDto, GuardSwagger, Swagger } from '@/config/';

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
}

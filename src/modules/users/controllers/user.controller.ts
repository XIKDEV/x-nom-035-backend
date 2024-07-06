import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { apiMethods, Swagger } from '@/config';

import { UserService } from '../services';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Swagger({
    restApi: apiMethods.get,
  })
  findAll() {
    return this.userService.findAll();
  }
}

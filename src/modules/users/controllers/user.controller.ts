import { apiMethods, GuardSwagger, Swagger } from '@/config/';

import { UserService } from '../services';

@GuardSwagger({
  tag: 'users',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Swagger({
    restApi: apiMethods.get,
  })
  findAll() {
    return this.userService.findAll();
  }
}

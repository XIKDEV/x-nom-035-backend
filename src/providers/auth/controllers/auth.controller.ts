/**
 * @fileoverview The AuthController class in TypeScript handles authentication-related endpoints with Swagger
documentation and guards. */
import { Body } from '@nestjs/common';
import { Users } from '@prisma/client';

import { apiMethods } from '@/config';
import { GuardSwagger, Swagger } from '@/config/swagger/decorators';

import { CurrentUser } from '../decorators/current-user.decorator';
import { LoginDto } from '../dtos';
import { AuthService } from '../services';

@GuardSwagger({
  tag: 'auth',
  hadSecurity: false,
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Swagger({
    restApi: apiMethods.post,
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Swagger({
    restApi: apiMethods.get,
    link: 'valid/JWT',
    hadSecurity: true,
  })
  validJwt(@CurrentUser() user: Users) {
    return this.authService.validJwt(user);
  }
}

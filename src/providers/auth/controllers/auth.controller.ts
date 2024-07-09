import { Body } from '@nestjs/common';

import { apiMethods, GuardSwagger, Swagger } from '@/config';

import { LoginDto } from '../dtos';
import { AuthService } from '../services';

@GuardSwagger({
  tag: 'auth',
  hadSecurity: false,
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Swagger({
    link: 'login',
    restApi: apiMethods.post,
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}

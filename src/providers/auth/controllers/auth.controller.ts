import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { apiMethods, Swagger } from '@/config';

import { LoginDto } from '../dtos';
import { AuthService } from '../services';

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Swagger({
    restApi: apiMethods.post,
    link: 'login',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}

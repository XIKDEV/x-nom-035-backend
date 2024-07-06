import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  baseResponse,
  handlerException,
  IBaseResponse,
  unauthorizedExceptionMessages,
} from '@/config';
import { TUserAttributesSelected, UserPrismaService } from '@/modules';

import { BcryptService } from '../../bcrypt';
import { LoginDto } from '../dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly userPrismaService: UserPrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login({
    email,
    password,
  }: LoginDto): Promise<IBaseResponse<TUserAttributesSelected>> {
    try {
      const { password: userPassword, ...user } =
        await this.userPrismaService.findByEmail(email);

      const validatePassword = await this.bcryptService.compare(
        password,
        userPassword,
      );

      if (!validatePassword)
        throw new UnauthorizedException(
          unauthorizedExceptionMessages.invalidCredentials,
        );

      return baseResponse<TUserAttributesSelected>({
        data: user,
      });
    } catch (error) {
      return handlerException(error);
    }
  }

  generateJwt(data: { id: number; email: string }): string {
    return this.jwtService.sign(data);
  }
}

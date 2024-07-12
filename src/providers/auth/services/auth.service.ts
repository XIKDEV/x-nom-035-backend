import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  baseResponse,
  handlerException,
  IBaseResponse,
  ICommonId,
  unauthorizedExceptionMessages,
} from '@/config';
import { TUserAttributesSelected, UserPrismaService } from '@/modules';

import { BcryptService } from '../../bcrypt';
import { LoginDto } from '../dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptService: BcryptService,
    @Inject(forwardRef(() => UserPrismaService))
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
        data: {
          ...user,
          token: this.generateJwt({ id: user.id }),
        },
      });
    } catch (error) {
      return handlerException(error);
    }
  }

  generateJwt(data: ICommonId): string {
    return this.jwtService.sign(data);
  }
}

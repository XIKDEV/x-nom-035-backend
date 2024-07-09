import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '@/modules';

import { BcryptModule } from '../bcrypt';
import { AuthController } from './controllers';
import { AuthService } from './services';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    BcryptModule,
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: configService.get<string>('EXPIRES_TIME') },
      }),
    }),
  ],
})
export class AuthModule {}

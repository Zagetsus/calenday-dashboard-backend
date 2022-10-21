import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppLogger } from '~/app.logger';
import { JWT_SECRET, JWT_SECRET_EXPIRES_IN } from '~/app.vars';
import { JwtStrategy } from '~/auth/strategies';
import { PrismaService } from '~/common/service';
import { UsersRepository } from '~/users/users.repository';
import { UsersService } from '~/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_SECRET_EXPIRES_IN
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UsersService,
    AppLogger,
    PrismaService,
    UsersRepository
  ],
  exports: [PassportModule, AuthService, JwtStrategy]
})
export class AuthModule {}

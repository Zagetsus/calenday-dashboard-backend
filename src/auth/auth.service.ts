import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User as UserModel } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '~/users/users.service';

interface AccessTokenDecoded {
  exp: number;
}

interface SignInParams {
  email: string;
  password: string;
}

interface CredentialsResponse {
  token: {
    accessToken: string;
    accessTokenExpiresIn: number;
    tokenType: string;
  };
  user: UserModel;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUserPassword(
    password: string,
    passwordHashed: string
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHashed);
  }

  async generateToken(user: UserModel): Promise<CredentialsResponse> {
    const payload = {
      document: user.document,
      updatedAt: user.updatedAt
    };
    const accessToken = this.jwtService.sign(payload);
    const accessTokenDecoded = this.jwtService.decode(
      accessToken
    ) as AccessTokenDecoded;
    const accessTokenExpiresIn = accessTokenDecoded.exp;

    return {
      token: {
        accessToken,
        accessTokenExpiresIn,
        tokenType: 'bearer'
      },
      user
    };
  }

  async signIn(params: SignInParams): Promise<CredentialsResponse> {
    const { email, password } = params;
    const user = await this.usersService.getUser({
      email
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await this.validateUserPassword(
      password,
      user.password ?? ''
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    return await this.generateToken(user);
  }
}

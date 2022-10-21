import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User as UserModel } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from '~/app.vars';
import { UsersService } from '~/users/users.service';

interface JwtPayload {
  document: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly service: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET
    });
  }

  async validate(payload: JwtPayload): Promise<UserModel> {
    const { document } = payload;

    const user = await this.service.getUser({
      document
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

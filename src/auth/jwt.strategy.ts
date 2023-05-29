import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey: configService.get<string>('jwt_secret'), разобраться с env файлом и попробовать использовать
      secretOrKey: 'jwt_secret',
      ignoreExpiration: false,
    });
  }
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}

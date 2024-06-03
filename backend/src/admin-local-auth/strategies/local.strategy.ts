import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminLocalAuthService } from '../admin-local-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AdminLocalAuthService) {
    super({ usernameField: 'email' });
  }

  validate(email: string, password: string) {
    const user = this.authService.validateUser({ email, password });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}

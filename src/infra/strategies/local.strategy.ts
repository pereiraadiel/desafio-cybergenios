import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticateService } from '@usecases/auth/authenticate/authenticate.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthenticateService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    return await this.authService.execute({ email: username, password });
  }
}

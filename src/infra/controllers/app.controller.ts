import { Controller, Post, Body } from '@nestjs/common';
import { AuthDTO } from '@interfaces/auth.dto';
import { AuthenticateService } from '@usecases/auth/authenticate/authenticate.service';

@Controller()
export class AppController {
  constructor(private authService: AuthenticateService) {}

  @Post('auth')
  login(@Body() auth: AuthDTO) {
    return this.authService.execute(auth);
  }
}

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCustomerService } from '@usecases/users/create-customer/create-customer.service';
import { UserDTO } from '@interfaces/user.dto';

@Controller('users')
export class CreateCustomerController {
  constructor(private readonly createCustomerService: CreateCustomerService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  handle(@Body() data: UserDTO) {
    return this.createCustomerService.execute(data);
  }
}

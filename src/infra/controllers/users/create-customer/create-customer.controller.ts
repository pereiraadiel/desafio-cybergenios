import { Body, Controller, Post } from '@nestjs/common';
import { CreateCustomerService } from '@usecases/users/create-customer/create-customer.service';
import { UserDTO } from '@interfaces/user.dto';

@Controller('users')
export class CreateCustomerController {
  constructor(private readonly createCustomerService: CreateCustomerService) {}

  @Post()
  handle(@Body() data: UserDTO) {
    return this.createCustomerService.execute(data);
  }
}

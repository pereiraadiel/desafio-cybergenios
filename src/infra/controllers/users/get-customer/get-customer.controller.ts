import { Controller, Get, Param } from '@nestjs/common';
import { GetCustomerService } from '@usecases/users/get-customer/get-customer.service';

@Controller('users')
export class GetCustomerController {
  constructor(private readonly getCustomerService: GetCustomerService) {}

  @Get(':id')
  handle(@Param('id') id: string) {
    return this.getCustomerService.execute(id);
  }
}

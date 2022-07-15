import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetCustomerService } from '@usecases/users/get-customer/get-customer.service';

@Controller('users')
export class GetCustomerController {
  constructor(private readonly getCustomerService: GetCustomerService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  handle(@Param('id') id: string) {
    return this.getCustomerService.execute(id);
  }
}

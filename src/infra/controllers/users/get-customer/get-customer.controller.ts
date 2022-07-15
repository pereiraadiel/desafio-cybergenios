import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetCustomerService } from '@usecases/users/get-customer/get-customer.service';
import { Role } from '@infra/authorization/roles.enum';
import { Roles } from '@infra/authorization/roles.decorator';
import { RolesGuard } from '@infra/authorization/roles.guard';

@Controller('users')
export class GetCustomerController {
  constructor(private readonly getCustomerService: GetCustomerService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Get(':id')
  handle(@Param('id') id: string) {
    return this.getCustomerService.execute(id);
  }
}

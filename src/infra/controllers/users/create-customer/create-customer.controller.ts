import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCustomerService } from '@usecases/users/create-customer/create-customer.service';
import { UserDTO } from '@interfaces/user.dto';
import { Role } from '@infra/authorization/roles.enum';
import { Roles } from '@infra/authorization/roles.decorator';
import { RolesGuard } from '@infra/authorization/roles.guard';

@Controller('users')
export class CreateCustomerController {
  constructor(private readonly createCustomerService: CreateCustomerService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Post()
  handle(@Body() data: UserDTO) {
    return this.createCustomerService.execute(data);
  }
}

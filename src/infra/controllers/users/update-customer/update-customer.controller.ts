import { RolesGuard } from '@infra/authorization/roles.guard';
import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCustomerService } from '@usecases/users/update-customer/update-customer.service';
import { UserDTO } from '@interfaces/user.dto';
import { Role } from '@infra/authorization/roles.enum';
import { Roles } from '@infra/authorization/roles.decorator';

@Controller('users')
export class UpdateCustomerController {
  constructor(private readonly updateCustomerService: UpdateCustomerService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  handle(@Param('id') id: string, @Body() data: Partial<UserDTO>) {
    return this.updateCustomerService.execute(id, data);
  }
}

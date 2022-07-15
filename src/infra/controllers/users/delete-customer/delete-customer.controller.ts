import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteCustomerService } from '@usecases/users/delete-customer/delete-customer.service';
import { Role } from '@infra/authorization/roles.enum';
import { Roles } from '@infra/authorization/roles.decorator';
import { RolesGuard } from '@infra/authorization/roles.guard';

@Controller('users')
export class DeleteCustomerController {
  constructor(private readonly deleteCustomerService: DeleteCustomerService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  handle(@Param('id') id: string) {
    return this.deleteCustomerService.execute(id);
  }
}

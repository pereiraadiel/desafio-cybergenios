import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteCustomerService } from '@usecases/users/delete-customer/delete-customer.service';

@Controller('users')
export class DeleteCustomerController {
  constructor(private readonly deleteCustomerService: DeleteCustomerService) {}

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  handle(@Param('id') id: string) {
    return this.deleteCustomerService.execute(id);
  }
}

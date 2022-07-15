import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteCustomerService } from '@usecases/users/delete-customer/delete-customer.service';

@Controller('users')
export class DeleteCustomerController {
  constructor(private readonly deleteCustomerService: DeleteCustomerService) {}

  @Delete(':id')
  handle(@Param('id') id: string) {
    return this.deleteCustomerService.execute(id);
  }
}

import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateCustomerService } from '@usecases/users/update-customer/update-customer.service';
import { UserDTO } from '@interfaces/user.dto';

@Controller('users')
export class UpdateCustomerController {
  constructor(private readonly updateCustomerService: UpdateCustomerService) {}

  @Patch(':id')
  handle(@Param('id') id: string, @Body() data: Partial<UserDTO>) {
    return this.updateCustomerService.execute(id, data);
  }
}

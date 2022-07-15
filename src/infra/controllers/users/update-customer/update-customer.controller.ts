import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCustomerService } from '@usecases/users/update-customer/update-customer.service';
import { UserDTO } from '@interfaces/user.dto';

@Controller('users')
export class UpdateCustomerController {
  constructor(private readonly updateCustomerService: UpdateCustomerService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  handle(@Param('id') id: string, @Body() data: Partial<UserDTO>) {
    return this.updateCustomerService.execute(id, data);
  }
}

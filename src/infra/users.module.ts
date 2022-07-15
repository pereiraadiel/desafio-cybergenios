import { Module } from '@nestjs/common';
import { AssignAdminController } from './controllers/users/assign-admin/assign-admin.controller';
import { CreateCustomerController } from './controllers/users/create-customer/create-customer.controller';
import { DeleteCustomerController } from './controllers/users/delete-customer/delete-customer.controller';
import { GetCustomerController } from './controllers/users/get-customer/get-customer.controller';
import { UnassignAdminController } from './controllers/users/unassign-admin/unassign-admin.controller';
import { UpdateCustomerController } from './controllers/users/update-customer/update-customer.controller';

@Module({
  controllers: [
    CreateCustomerController,
    DeleteCustomerController,
    GetCustomerController,
    AssignAdminController,
    UnassignAdminController,
    UpdateCustomerController,
  ],
  providers: [],
})
export class UsersModule {}

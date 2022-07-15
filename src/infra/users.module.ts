import { Module } from '@nestjs/common';
import { PrismaService } from './config/PrismaService';

import { AssignAdminController } from './controllers/users/assign-admin/assign-admin.controller';
import { CreateCustomerController } from './controllers/users/create-customer/create-customer.controller';
import { DeleteCustomerController } from './controllers/users/delete-customer/delete-customer.controller';
import { GetCustomerController } from './controllers/users/get-customer/get-customer.controller';
import { UnassignAdminController } from './controllers/users/unassign-admin/unassign-admin.controller';
import { UpdateCustomerController } from './controllers/users/update-customer/update-customer.controller';

import { CreateCustomerService } from '@usecases/users/create-customer/create-customer.service';
import { GetCustomerService } from '@usecases/users/get-customer/get-customer.service';
import { UpdateCustomerService } from '@usecases/users/update-customer/update-customer.service';
import { DeleteCustomerService } from '@usecases/users/delete-customer/delete-customer.service';

@Module({
  controllers: [
    CreateCustomerController,
    DeleteCustomerController,
    GetCustomerController,
    AssignAdminController,
    UnassignAdminController,
    UpdateCustomerController,
  ],
  providers: [
    CreateCustomerService,
    DeleteCustomerService,
    GetCustomerService,
    UpdateCustomerService,
    PrismaService,
  ],
})
export class UsersModule {}

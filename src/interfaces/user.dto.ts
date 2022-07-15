import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
  id?: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  cpf: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  address: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  role: 'customer' | 'admin';
}

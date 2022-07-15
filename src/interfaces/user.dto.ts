export type UserDTO = {
  id?: string;
  name: string;
  cpf: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
};

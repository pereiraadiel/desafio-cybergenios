import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CarDTO {
  id?: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  brand: string;
  @IsNotEmpty()
  model: string;
  @IsNumberString()
  year: string;
}

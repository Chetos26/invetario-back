/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString} from "class-validator";

export class UsersDto {
  @IsNotEmpty()
  @IsString()
  foto: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;
}

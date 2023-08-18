/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString} from "class-validator";

export class UsersDto {
  
  @IsNotEmpty()
  @IsString()
  foto: string;

  @IsNotEmpty()
  @IsString()
  cargo: string;

  @IsNotEmpty()
  @IsString()
  nombre_u: string;

  @IsNotEmpty()
  @IsString()
  apellido_u: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  telf: string;
}

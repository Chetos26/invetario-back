/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CategoryDto {

  @IsNotEmpty()
  @IsString()
  nombre_c: string;
  
}

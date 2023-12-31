/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";
import { CreateUsersDto } from "./create-users.dto";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUsersDto extends PartialType(CreateUsersDto) {
  
  /* @IsNotEmpty()
  @IsString()
  foto: string; */

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
  telf: string;

  @IsNotEmpty()
  @IsString()
  email: string;

}

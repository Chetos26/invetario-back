/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";
import { CreateUsersDto } from "./create-users.dto";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUsersDto extends PartialType(CreateUsersDto) {
  
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  foto: string;

  @IsNotEmpty()
  @IsString()
  cargo: string;

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

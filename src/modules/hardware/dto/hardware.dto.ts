/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsNotEmpty } from "class-validator";
import { Category } from "src/modules/categories/entities/category.entity";
import { Users } from "src/modules/users/entities/users.entity";

export class HardwareDto{

    /* @IsOptional()
    @IsString()
    filename: string; */
    @IsOptional()
    @IsString()
    monitor_sn: string;

    @IsOptional()
    @IsString()
    sn: string;
    
    @IsOptional()
    @IsString()
    marca: string;

    @IsOptional()
    @IsString()
    modelo: string;

    @IsOptional()
    @IsString()
    procesador: string;

    @IsOptional()
    @IsString()
    ram: string;

    @IsOptional()
    @IsString()
    almacenamiento: string;

    @IsNotEmpty()
    categoria: Category;

    @IsNotEmpty()
    usuario: Users;
    
}
/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";
import { Category } from "src/modules/categories/entities/category.entity";
import { Users } from "src/modules/users/entities/users.entity";

export class HardwareDto{

    /* @IsNotEmpty()
    @IsString()
    filename: string; */
    @IsNotEmpty()
    @IsString()
    monitor_sn: string;

    @IsNotEmpty()
    @IsString()
    sn: string;
    
    @IsNotEmpty()
    @IsString()
    marca: string;

    @IsNotEmpty()
    @IsString()
    modelo: string;

    @IsNotEmpty()
    @IsString()
    procesador: string;

    @IsNotEmpty()
    @IsString()
    ram: string;

    @IsNotEmpty()
    @IsString()
    almacenamiento: string;

    @IsNotEmpty()
    categoria: Category;

    @IsNotEmpty()
    usuario: Users;
    
}
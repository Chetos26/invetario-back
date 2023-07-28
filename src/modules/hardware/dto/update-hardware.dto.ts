/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateHardwareDto } from './create-hardware.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Users } from 'src/modules/users/entities/users.entity';

export class UpdateHardwareDto extends PartialType(CreateHardwareDto) {

    @IsOptional()
    @IsString()
    image: string;

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
    os: string;

    @IsOptional()
    @IsString()
    procesador: string;

    @IsOptional()
    @IsString()
    ram: string;

    @IsNotEmpty()
    categoria: Category;

    @IsNotEmpty()
    usuario: Users;

}

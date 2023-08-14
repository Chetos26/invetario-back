/* eslint-disable prettier/prettier */
import { IsEnum } from "class-validator";
import { RolEnum } from "../rol.enum";

export class UpdateTipoUsuarioDto {

    @IsEnum(RolEnum,{ message: 'El rol solo puede ser cliente o admin' })
    nombre_tipo_usuario?: string;
}
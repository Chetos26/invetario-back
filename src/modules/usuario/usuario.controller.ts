/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Patch, Delete, Body, Param, } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-user.dto';
import { UpdateUsuarioDto } from './dto/update-user.dto';
import { UsuarioEntity } from './usuario.entity';

@Controller('usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) { }

    @Post()
    async createUsuario(@Body() nuevaUsuario: CreateUsuarioDto) {
        return await this.usuarioService.createUsuario(nuevaUsuario)
    }

    @Get(':user_id')
    getUsuarioById(@Param('user_id') id: number): Promise<UsuarioEntity> {
        return this.usuarioService.getUsuarioById(id)
    }

    @Get()
    getUsuarioList(){
        return this.usuarioService.getUsuariosList()
    }

    @Delete(':user_id')
    deleteUsuario(@Param('user_id') id: number){
        return this.usuarioService.deleteUsuario(id)
    }

    @Patch(':user_id')
    updateUsuario (@Param('user_id') id: number, @Body() usuario: UpdateUsuarioDto){
        return this.usuarioService.updateUsuario(id, usuario)
    }

}

/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NuevoUsuarioDto } from './dto/new-usuario.dto';
import { LoginUsuarioDto } from './dto/login.dto';
import { UpdateUsuarioDto } from '../usuario/dto/update-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    login(@Body() login: LoginUsuarioDto) {
        return this.authService.login(login)
    }


    @Post('nuevo')
    createUsuario(@Body() nuevaUsuario: NuevoUsuarioDto) {
        return this.authService.createUsuario(nuevaUsuario)
    }

    @Get()
    getUsuarioList(){
        return this.authService.getUsuariosList()
    }

    @Get(':user_id')
    getUsuarioById(@Param('user_id') id: number){
        return this.authService.getUsuarioById(id)
    }

    @Patch(':user_id')
    updateUsuario (@Param('user_id') id: number, @Body() usuario: UpdateUsuarioDto){
        return this.authService.updateUsuario(id, usuario)
    }

    @Delete(':user_id')
    deleteUsuario(@Param('user_id') id: number){
        return this.authService.deleteUsuario(id)
    }
}

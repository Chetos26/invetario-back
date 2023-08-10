/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compare } from "bcryptjs";
import { MessageDto } from "src/common/message.dto";
import { Repository } from "typeorm";
import { RolEnum } from "../tipo_usuario/rol.enum";
import { TipoUsuarioEntity } from "../tipo_usuario/tipo_usuario.entity";
import { UpdateUsuarioDto } from "../usuario/dto/update-user.dto";
import { UsuarioEntity } from "../usuario/usuario.entity";
import { LoginUsuarioDto } from "./dto/login.dto";
import { NuevoUsuarioDto } from "./dto/new-usuario.dto";
import { PayloadInterface } from "./payload.interface";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(TipoUsuarioEntity)
        private readonly tipoUsuarioRepository: Repository<TipoUsuarioEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly authRepository: Repository<UsuarioEntity>,
        private readonly jwtService: JwtService
    ) { }

    async getUsuariosList(): Promise<UsuarioEntity[]> {
        const usuarios = await this.authRepository.find();
        if (!usuarios.length)
            throw new NotFoundException(
                new MessageDto('No existe un listado de usuarios'),
            );
        return usuarios;
    }

    async createUsuario(usuario: NuevoUsuarioDto): Promise<any> {
        const { username, email } = usuario;
        const exists = await this.authRepository.findOne({
            where: [{ username: username }, { email: email }],
        });
        if (exists)
            throw new BadRequestException(new MessageDto('Usuario ya registrado'));
        const rolUser = await this.tipoUsuarioRepository.findOne({
            where: { nombre_tipo_usuario: RolEnum.USER },
        });
        if (!rolUser)
            throw new InternalServerErrorException(
                new MessageDto('Los roles aún no han sido creados'),
            );
        const user = this.authRepository.create(usuario);
        user.tipo_usuarioId = [rolUser];
        await this.authRepository.save(user);
        return new MessageDto('Cliente creado');
    }

    async login(dto: LoginUsuarioDto): Promise<any> {
        const { email } = dto;
        const usuario = await this.authRepository.findOne({ where: [{ email: email }, { username: email }] });
        console.log(usuario);
        if (!usuario) return new UnauthorizedException(new MessageDto('Usuario no existente'));
        const passwordOk = await compare(dto.password, usuario.password);
        if (!passwordOk) return new UnauthorizedException(new MessageDto('password erronea'));
        const payload: PayloadInterface = {
            user_id: usuario.user_id,
            email: usuario.email,
            username: usuario.username,
            roles: usuario.tipo_usuarioId.map(tipo_usuario => tipo_usuario.nombre_tipo_usuario as RolEnum)
        }
        const token = await this.jwtService.sign(payload);
        return {token};
    }

    async getUsuarioById(user_id: number) {
        return await this.authRepository.findOne({
            where: {
                user_id
            }
        })
    }

    async deleteUsuario(user_id: number) {
        return this.authRepository.delete({ user_id })
    }

    async updateUsuario(user_id: number, usuario: UpdateUsuarioDto){
        this.authRepository.update({user_id}, usuario)
    }

}

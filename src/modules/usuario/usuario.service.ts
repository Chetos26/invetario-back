/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-user.dto';
import { UpdateUsuarioDto } from './dto/update-user.dto';
import { MessageDto } from 'src/common/message.dto';
import { TipoUsuarioEntity } from '../tipo_usuario/tipo_usuario.entity';
import { RolEnum } from '../tipo_usuario/rol.enum';

@Injectable()
export class UsuarioService {

    constructor(
    @InjectRepository(TipoUsuarioEntity)
    private readonly tipoUsuarioRepository: Repository<TipoUsuarioEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async getUsuariosList(): Promise<UsuarioEntity[]> {
    const usuarios = await this.usuarioRepository.find();
    if (!usuarios.length)
      throw new NotFoundException(
        new MessageDto('No existe un listado de usuarios'),
      );
    return usuarios;
  }

  async createUsuario(usuario: CreateUsuarioDto): Promise<any> {

    const rolAdmin = await this.tipoUsuarioRepository.findOne({
      where: { nombre_tipo_usuario: RolEnum.ADMIN },
    });
    const rolUser = await this.tipoUsuarioRepository.findOne({
      where: { nombre_tipo_usuario: RolEnum.USER },
    });
    if (!rolAdmin || !rolUser)
      throw new InternalServerErrorException(
        new MessageDto('los roles aún no han sido creados'),
      );
    const admin:UsuarioEntity = this.usuarioRepository.create(usuario);
    admin.tipo_usuarioId = [rolAdmin, rolUser];
    console.log(admin)
    await this.usuarioRepository.save(admin);
    return new MessageDto('Admin creado');
  }

    async getUsuarioById(user_id: number) {
        return await this.usuarioRepository.findOne({
            where: {
                user_id
            }
        })
    }

    async deleteUsuario(user_id: number){
        return this.usuarioRepository.delete({ user_id })
    }

    async updateUsuario(user_id: number, usuario: UpdateUsuarioDto){
        this.usuarioRepository.update({user_id}, usuario)
    }
    
}

/* eslint-disable prettier/prettier */

import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolEnum } from './rol.enum';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity({ name: 'tipo-usuario' })
export class TipoUsuarioEntity {
    
  @PrimaryGeneratedColumn()
  id_tipo_usuario: number;

  @Column({ type: 'character varying', default: 'usuario' })
  nombre_tipo_usuario: RolEnum;

  @ManyToMany(() => UsuarioEntity, usuario => usuario.tipo_usuarioId)
  tipo_usuario: UsuarioEntity[];

}

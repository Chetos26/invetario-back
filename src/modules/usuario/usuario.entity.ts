/* eslint-disable prettier/prettier */

import { hash } from 'bcryptjs';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TipoUsuarioEntity } from '../tipo_usuario/tipo_usuario.entity';

@Entity({ name: 'usuario' })
export class UsuarioEntity {
    
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column("varchar", {
    name: "username",
    length: 25,
    nullable: false,
    comment: "Nombre de Usuario",
  })
  username: string;

  @Column("varchar", {
    name: "email",
    length: 25,
    nullable: false,
    comment: "Email de Usuario",
  })
  email: string;

  @Column("varchar", {
    name: "password",
    nullable: false,
    comment: "Contraseña",
  })
  password: string;

  @ManyToMany(() => TipoUsuarioEntity, (rol) => rol.tipo_usuario, { eager: true })
  @JoinTable({ 
    name: 'usuario_tipo',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'rol_id' },
  })
  tipo_usuarioId: TipoUsuarioEntity[];
  
  @BeforeInsert()
  @BeforeUpdate()
  async hashPasword() {
    if (!this.password) return;
    this.password = await hash(this.password, 12);
  }
}

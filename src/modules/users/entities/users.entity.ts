/* eslint-disable prettier/prettier */
import { ImageColumn } from "src/decorators/image.decorator";
import { Hardware } from "src/modules/hardware/entities/hardware.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Usuarios')
export class Users {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ImageColumn()
  imagePath: string;

  @Column('varchar',{
    name: 'nombre_u',
    length: 10,
    nullable: false,
    comment: 'Nombre del usuario',  
    })
    nombre_u: string;

  @Column('varchar',{
    name: 'apellido_u',
    length: 10,
    nullable: false,
    comment: 'Apellido del usuario',  
  })
  apellido_u: string;
  
  @Column('varchar',{
    name: 'telf',
    nullable: true,
    length: 10,
    comment: 'Telefono del usuario',  
  })
  telf: string;
  
  @Column('varchar',{
    name: 'email',
    nullable: true,
    length: 20,
    comment: 'email del usuario',  
  })
  email: string;

  @OneToMany((type) => Hardware, (hardware) => hardware.users)
  hardware: Hardware[];
}
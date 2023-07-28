/* eslint-disable prettier/prettier */
import { Hardware } from "src/modules/hardware/entities/hardware.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Categorias')
export class Category {

  @PrimaryGeneratedColumn('uuid')
  id_c: string;

  @Column('varchar', {
    name: 'nombre_c',
    length: 20,
    nullable: false,
    comment: 'Nombre de la categoria',
  })
  nombre_c: string;

  @OneToMany((type) => Hardware, (hardware) => hardware.categories)
  hardware: Hardware[];
  
}

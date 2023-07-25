/* eslint-disable prettier/prettier */
import { Users } from "src/modules/users/entities/users.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('hardware')

export class Hardware {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type=> Users, users => users.hardware)
    users: Users;

    @ManyToOne(type=> Categorias, categorias=> categorias.hardware)
    categorias: Categorias;


}

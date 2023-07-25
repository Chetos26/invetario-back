/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('hardware')

export class Hardware {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

}

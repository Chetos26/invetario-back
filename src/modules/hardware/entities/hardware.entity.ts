/* eslint-disable prettier/prettier */
import { ImageColumn } from "src/decorators/image.decorator";
import { Category } from "src/modules/categories/entities/category.entity";
import { Users } from "src/modules/users/entities/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Hardware')

export class Hardware {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ImageColumn()
    image: string;

    @Column('varchar',{
        name: 'monitor_sn',
        length: 20,
        nullable: false,
        comment: 'Numero de serie Monitor',  
        })
    monitor_sn: string;

    @Column('varchar',{
        name: 'mouse',
        nullable: false,
        comment: 'Mouse',  
        })
    mouse: boolean;

    @Column('varchar',{
        name: 'teclado',
        nullable: false,
        comment: 'Teclado',  
        })
    teclado: boolean;

    @Column('varchar',{
        name: 'sn',
        length: 20,
        nullable: false,
        comment: 'Numero de Serie del computador',  
        })
    sn: string;

    @Column('varchar',{
        name: 'marca',
        length: 10,
        nullable: false,
        comment: 'Marca del equipo',  
    })
    marca: string;

    @Column('varchar',{
        name: 'procesador',
        length: 100,
        nullable: false,
        comment: 'Procesador del equipo',  
    })
    procesador: string;

    @Column('varchar',{
        name: 'ram',
        length: 100,
        nullable: false,
        comment: 'RAM del equipo',  
    })
    ram: string;


    @Column('varchar',{
        name: 'sala',
        length: 15,
        nullable: false,
        comment: 'Ubicacion del equipo',  
    })
    sala: string;

    @ManyToOne(type=> Users, users => users.hardware)
    users: Users;

    @ManyToOne(type=> Category, categorias=> categorias.hardware)
    categorias: Category;


}

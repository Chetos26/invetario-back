/* eslint-disable prettier/prettier */
import { ImageColumn } from "src/decorators/image.decorator";
import { Category } from "src/modules/categories/entities/category.entity";
import { Users } from "src/modules/users/entities/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Hardware')

export class Hardware {
    
    @PrimaryGeneratedColumn('uuid')
    id_h: string;

    /* @Column('varchar', {
        name: 'filename', // Agrega el campo filename
        length: 255,
        nullable: true, // Puede ser nulo si no siempre hay imágenes asociadas
        comment: 'Nombre del archivo de la imagen',
      })
      filename: string; */

    @Column('varchar',{
        name: 'monitor_sn',
        length: 20,
        nullable: true,
        comment: 'Numero de serie Monitor',  
        })
    monitor_sn: string;

    @Column('varchar',{
        name: 'mouse',
        length: 5,
        nullable: true,
        comment: 'Mouse',  
        })
    mouse: string;

    @Column('varchar',{
        name: 'teclado',
        length: 5,
        nullable: true,
        comment: 'Teclado',  
        })
    teclado: string;

    @Column('varchar',{
        name: 'sn',
        length: 20,
        nullable: true,
        comment: 'Numero de Serie del computador',  
        })
    sn: string;

    @Column('varchar',{
        name: 'marca',
        length: 15,
        nullable: true,
        comment: 'Marca del equipo',  
    })
    marca: string;

    @Column('varchar',{
        name: 'procesador',
        length: 100,
        nullable: true,
        comment: 'Procesador del equipo',  
    })
    procesador: string;

    @Column('varchar',{
        name: 'ram',
        length: 100,
        nullable: true,
        comment: 'RAM del equipo',  
    })
    ram: string;

    @Column('varchar',{
        name: 'almacenamiento',
        length: 100,
        nullable: true,
        comment: 'Almacenamiento del equipo',  
    })
    almacenamiento: string;

    @Column('varchar',{
        name: 'sala',
        length: 15,
        nullable: true,
        comment: 'Ubicacion del equipo',  
    })
    sala: string;

    @ManyToOne(type=> Users, users => users.hardware)
    users: Users;

    @ManyToOne(type=> Category, categories=> categories.hardware)
    categories: Category;


}

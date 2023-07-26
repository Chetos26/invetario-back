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
        name: 'sn',
        length: 10,
        nullable: false,
        comment: 'Numero de Serie',  
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
        name: 'modelo',
        length: 10,
        nullable: false,
        comment: 'Modelo del equipo',  
    })
    modelo: string;

    @Column('varchar',{
        name: 'os',
        length: 15,
        nullable: false,
        comment: 'Sistema operativo del equipo',  
    })
    os: string;

    @Column('varchar',{
        name: 'procesador',
        length: 15,
        nullable: false,
        comment: 'Procesador del equipo',  
    })
    procesador: string;

    @Column('varchar',{
        name: 'ram',
        length: 15,
        nullable: false,
        comment: 'RAM del equipo',  
    })
    ram: string;

    @ManyToOne(type=> Users, users => users.hardware)
    users: Users;

    @ManyToOne(type=> Category, categorias=> categorias.hardware)
    categorias: Category;


}

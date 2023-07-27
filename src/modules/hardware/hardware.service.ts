/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { CreateHardwareDto } from "./dto/create-hardware.dto";
import { UpdateHardwareDto } from "./dto/update-hardware.dto";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ErrorManager } from "src/utils/error.manager";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../categories/entities/category.entity";
import { Hardware } from "./entities/hardware.entity";
import { HardwareDto } from "./dto/hardware.dto";

@Injectable()
export class HardwareService {
  constructor(
    @InjectRepository(Hardware) private hardwareRepostory: Repository<Hardware>,
    @InjectRepository(Category) private categoryRepostory: Repository<Category>
    ){}
    

  async create(createhardwareDto: HardwareDto):Promise<Hardware> {
    try {
        const hardware: Hardware = await this.hardwareRepostory.save(createhardwareDto);
        return hardware;
      } catch (e) {
        throw new Error(e);
    }
  }

  /*async findAll():Promise<Event[]> {
    try {
        const hardware: Event[] =await this.hardwareepostory.createQueryBuilder('eventos')
        .leftJoinAndSelect('eventos.maestro','maestro')
        .leftJoinAndSelect('maestro.asignatura','asignatura')
        .leftJoinAndSelect('asignatura.user','usuario')
        .leftJoinAndSelect('eventos.categoria','categoria')
        .getMany();
        if (hardware.length === 0) {
          throw new ErrorManager({
            type:'BAD_REQUEST',
            message:'No existen registros'
          });
        }
        return hardware
      } catch (e) {
        throw ErrorManager.createSignatureError(e.message);
    }
  }*/
  /*async findAllbyUser(user:string):Promise<Event[]> {
    try {
        const subjects: Event[] =await this.eventRepostory.createQueryBuilder('eventos')
        .leftJoinAndSelect('eventos.categoria','categoria')
        .leftJoinAndSelect('eventos.maestro','maestro')
        .leftJoinAndSelect('maestro.asignatura','asignatura')
        .leftJoinAndSelect('asignatura.user','usuario').where('asignatura.user = :user',{user}).getMany();
        if (!subjects) {
          throw new ErrorManager({
            type:'BAD_REQUEST',
            message:'No existen el registro'
          });
        }else {
          return subjects
        }
      } catch (e) {
        throw ErrorManager.createSignatureError(e.message);
    }
  }*/

  /*async findOne(id: string):Promise<Event> {
    try {
        const event: Event = await this.eventRepostory
        .createQueryBuilder('eventos')
        .leftJoinAndSelect('eventos.maestro','maestro')
        .leftJoinAndSelect('maestro.asignatura','asignatura')
        .leftJoinAndSelect('asignatura.user','usuario')
        .leftJoinAndSelect('eventos.categoria','categoria')
        .where({id}).getOne()
        if (!event) {
          throw new ErrorManager({
            type:'BAD_REQUEST',
            message:'No se ha encontrado el registro'
          });
        }
        return event;
      } catch (e) {
        throw ErrorManager.createSignatureError(e.message);
    }
  }*/
  /*async update(id: string, updateeventDto: UpdateHardwareDto):Promise<UpdateResult | undefined> {
   try {
       const event: UpdateResult =  await this.eventRepostory.update(id,updateeventDto);
       if (event.affected === 0) {
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message:'No se ha podido actualizar'
        });
       }
        return event;
     } catch (e) {
      throw ErrorManager.createSignatureError(e.message)
      
   }
  }

  async remove(id: string):Promise<DeleteResult | undefined> {
    try {
        const event: DeleteResult =  await this.eventRepostory.delete(id);
        if (event.affected === 0) {
          throw new ErrorManager({
            type:'BAD_REQUEST',
            message:'No se ha podido borrar'
          });
        }
          return event;
      } catch (e) {
        throw ErrorManager.createSignatureError(e.message)
    }
   }*/
}

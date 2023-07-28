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
import { PaginationDto } from "src/common/dto/pagination.dto";
import { Users } from "../users/entities/users.entity";

@Injectable()
export class HardwareService {
  constructor(
    @InjectRepository(Hardware) private hardwareRepository: Repository<Hardware>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(Category) private usersRepository: Repository<Users>
    ){}
    

  async create(createhardwareDto: HardwareDto):Promise<Hardware> {
    try {
        const hardware: Hardware = await this.hardwareRepository.save(createhardwareDto);
        return hardware;
      } catch (e) {
        throw new Error(e);
    }
  }

  async findAll(): Promise<Hardware[]> {
    return this.hardwareRepository
      .createQueryBuilder('hardware')
      .leftJoinAndSelect('hardware.categories', 'categories')
      .leftJoinAndSelect('hardware.users', 'users')
      .getMany();
  }

  async findOne(id_h: string):Promise<Hardware> {
    try {
        const hardware: Hardware = await this.hardwareRepository.createQueryBuilder('hardware')
        .leftJoinAndSelect('hardware.categories', 'categories')
        .leftJoinAndSelect('hardware.users', 'users').where({id_h}).getOne()
        if (!hardware) {
          throw new ErrorManager({
            type:'BAD_REQUEST',
            message:'No se ha encontrado el registro'
          });
        }
        return hardware;
      } catch (e) {
        throw ErrorManager.createSignatureError(e.message);
    }
  }

  async update(id_h: string, updatehardwareDto: UpdateHardwareDto):Promise<UpdateResult | undefined> {
   try {
       const hardware: UpdateResult =  await this.hardwareRepository.update(id_h, updatehardwareDto);
       if (hardware.affected === 0) {
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message:'No se ha podido actualizar'
        });
       }
        return hardware;
     } catch (e) {
      throw ErrorManager.createSignatureError(e.message)
      
   }
  }

  async remove(id_h: string):Promise<DeleteResult | undefined> {
    try {
        const hardware: DeleteResult =  await this.hardwareRepository.delete(id_h);
        if (hardware.affected === 0) {
          throw new ErrorManager({
            type:'BAD_REQUEST',
            message:'No se ha podido borrar'
          });
        }
          return hardware;
      } catch (e) {
        throw ErrorManager.createSignatureError(e.message)
    }
   }
}

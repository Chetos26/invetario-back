/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateHardwareDto } from "./dto/update-hardware.dto";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ErrorManager } from "src/utils/error.manager";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../categories/entities/category.entity";
import { Hardware } from "./entities/hardware.entity";
import { HardwareDto } from "./dto/hardware.dto";
import { Users } from "../users/entities/users.entity";

@Injectable()
export class HardwareService {
  constructor(
    @InjectRepository(Hardware) private hardwareRepository: Repository<Hardware>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(Category) private usersRepository: Repository<Users>,
    ){}

/*     async uploadFile(filename: string): Promise<Hardware> {
      // Lógica para guardar la información de la imagen en la entidad Hardware
      // Por ejemplo, crea una nueva instancia de Hardware y asigna el nombre de archivo
      const newHardware = this.hardwareRepository.create({ filename });
      const savedHardware = await this.hardwareRepository.save(newHardware);
      return savedHardware;
    }
     */
    
  async create(createhardwareDto: HardwareDto):Promise<Hardware> {
    try {
        const hardware: Hardware = await this.hardwareRepository.save(createhardwareDto);
        return hardware;
      } catch (e) {
        throw new Error(e);
    }
  }

  async getAllHardware(selectedCategories?: string, searchTerm?: string): Promise<Hardware[]> {
    let query = this.hardwareRepository.createQueryBuilder('hardware');

    if (selectedCategories) {
      query = query.where('hardware.categories = :categories', { categories: selectedCategories });
    }

    if (searchTerm) {
      query = query.andWhere('hardware.user = :user', { user: searchTerm });
    }

    return await query.getMany();
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

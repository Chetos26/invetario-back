/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersDto } from './dto/users.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UpdateUsersDto } from './dto/update-users.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>
    ){}

    async checkDuplicateEmail(email: string): Promise<boolean> {
      const existingUser = await this.usersRepository.findOne({ where: { email } });
      return !!existingUser;
    }
  
    async checkDuplicatePhone(phone: string): Promise<boolean> {
      const existingUser = await this.usersRepository.findOne({ where: { telf: phone } });
      return !!existingUser;
    }
    
    async create(usersDto: UsersDto): Promise<Users> {
      const { email, telefono } = usersDto;
  
      if (await this.checkDuplicateEmail(email)) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El email ya está registrado',
        });
      }
  
      if (await this.checkDuplicatePhone(telefono)) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El número de teléfono ya está registrado',
        });
      }
  
      try {
        const users: Users = await this.usersRepository.save(usersDto);
        return users;
      } catch (e) {
        throw new Error(e);
      }
    }
  
    async update(id_u: string, updateUsersDto: UpdateUsersDto): Promise<UpdateResult | undefined> {
      const { email, telefono } = updateUsersDto;
  
      if (await this.checkDuplicateEmail(email)) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El email ya está registrado',
        });
      }
  
      if (await this.checkDuplicatePhone(telefono)) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El número de teléfono ya está registrado',
        });
      }
  
      try {
        const users: UpdateResult = await this.usersRepository.update(id_u, updateUsersDto);
        if (users.affected === 0) {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'No se ha podido actualizar',
          });
        }
        return users;
      } catch (e) {
        throw ErrorManager.createSignatureError(e.message);
      }
    }

  async findAll():Promise<Users[]> {
    try {
        const users: Users[] =await this.usersRepository.find();
        if (users.length === 0) {
          throw new ErrorManager({
            type:'BAD_REQUEST',
            message:'No existen registros'
          });
        }
        return users
      } catch (e) {
        throw ErrorManager.createSignatureError(e.message);
    }
  }

  async findOne(id_u: string):Promise<Users> {
    try {
        const users: Users = await this.usersRepository.createQueryBuilder('users').where({id_u}).getOne()
        if (!users) {
          throw new ErrorManager({
            type:'BAD_REQUEST',
            message:'No se ha encontrado el registro'
          });
        }
        return users;
      } catch (e) {
        throw ErrorManager.createSignatureError(e.message);
    }
  }
  
  /*async update(id_u: string, updateUsersDto: UpdateUsersDto): Promise<UpdateResult | undefined> {
    try {
      const users: UpdateResult = await this.usersRepository.update(id_u, updateUsersDto);
      if (users.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se ha podido actualizar',
        });
      }
      return users;
    } catch (e) {
      throw ErrorManager.createSignatureError(e.message);
    }
  }*/

  async remove(id_u: string):Promise<DeleteResult | undefined> {
    try {
        const users: DeleteResult =  await this.usersRepository.delete(id_u);
        if (users.affected === 0) {
          throw new ErrorManager({
            type:'BAD_REQUEST',
            message:'No se ha podido borrar'
          });
        }
          return users;
      } catch (e) {
        throw ErrorManager.createSignatureError(e.message)
    }
   }
}

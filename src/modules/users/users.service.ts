/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersDto } from './dto/users.dto';
import { CreateUsersDto } from './dto/create-users.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UpdateUsersDto } from './dto/update-users.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>
    ){}
    

  async create(createusersDto: UsersDto):Promise<Users> {
    try {
      console.log(createusersDto)
        const users: Users = await this.usersRepository.save(createusersDto);
        return users;
      } catch (e) {
        throw new Error(e);
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
  
  async update(id_u: string, updateUsersDto: UpdateUsersDto): Promise<UpdateResult | undefined> {
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

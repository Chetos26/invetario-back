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
    @InjectRepository(Users) private usersRepostory: Repository<Users>
    ){}
    

  async create(createusersDto: UsersDto):Promise<Users> {
    try {
      console.log(createusersDto)
        const users: Users = await this.usersRepostory.save(createusersDto);
        return users;
      } catch (e) {
        throw new Error(e);
    }
  }

  async findAll():Promise<Users[]> {
    try {
        const users: Users[] =await this.usersRepostory.find();
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

  async findOne(id: string):Promise<Users> {
    try {
        const users: Users = await this.usersRepostory.createQueryBuilder('users').where({id}).getOne()
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
  async update(id: string, updateusersDto: UpdateUsersDto):Promise<UpdateResult | undefined> {
   try {
       const users: UpdateResult =  await this.usersRepostory.update(id,updateusersDto);
       if (users.affected === 0) {
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message:'No se ha podido actualizar'
        });
       }
        return users;
     } catch (e) {
      throw ErrorManager.createSignatureError(e.message)
   }
  }

  async remove(id: string):Promise<DeleteResult | undefined> {
    try {
        const users: DeleteResult =  await this.usersRepostory.delete(id);
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

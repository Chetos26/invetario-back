/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepostory: Repository<Category>
    ){}
    

  async create(createcategoryDto: CategoryDto):Promise<Category> {
    try {
        const category: Category = await this.categoryRepostory.save(createcategoryDto);
        return category;
      } catch (e) {
        throw new Error(e);
    }
  }

  async findAll():Promise<Category[]> {
    try {
        const category: Category[] =await this.categoryRepostory.find();
        if (category.length === 0) {
          throw new ErrorManager({
            type:'BAD_REQUEST',
            message:'No existen registros'
          });
        }
        return category
      } catch (e) {
        throw ErrorManager.createSignatureError(e.message);
    }
  }

  async findOne(id: string):Promise<Category> {
    try {
        const category: Category = await this.categoryRepostory.createQueryBuilder('hardware').where({id}).getOne()
        if (!category) {
          throw new ErrorManager({
            type:'BAD_REQUEST',
            message:'No se ha encontrado el registro'
          });
        }
        return category;
      } catch (e) {
        throw ErrorManager.createSignatureError(e.message);
    }
  }
  async update(id: string, updatecategoryDto: UpdateCategoryDto):Promise<UpdateResult | undefined> {
   try {
       const category: UpdateResult =  await this.categoryRepostory.update(id,updatecategoryDto);
       if (category.affected === 0) {
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message:'No se ha podido actualizar'
        });
       }
        return category;
     } catch (e) {
      throw ErrorManager.createSignatureError(e.message)
   }
  }

  async remove(id: string):Promise<DeleteResult | undefined> {
    try {
        const category: DeleteResult =  await this.categoryRepostory.delete(id);
        if (category.affected === 0) {
          throw new ErrorManager({
            type:'BAD_REQUEST',
            message:'No se ha podido borrar'
          });
        }
          return category;
      } catch (e) {
        throw ErrorManager.createSignatureError(e.message)
    }
   }
}

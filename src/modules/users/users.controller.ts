/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersDto } from './dto/users.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUsersDto: UsersDto) {
    console.log(createUsersDto)
    return await this.usersService.create(createUsersDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id_u')
  async findOne(@Param('id_u') id_u: string) {
    return await this.usersService.findOne(id_u);
  }

  @Patch(':id_u')
  async update(@Param('id_u') id_u: string, @Body() updateUsersDto: UpdateUsersDto) {
    return await this.usersService.update(id_u, updateUsersDto);
  }

  @Delete(':id_u')
  async remove(@Param('id_u') id_u: string) {
    return await this.usersService.remove(id_u);
  }
}

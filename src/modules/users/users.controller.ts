/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersDto } from './dto/users.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /*@Post()
  create(@Body() createUsersDto: UsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUsersDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}*/

  @Post()
  async create(@Body() createUsersDto: UsersDto) {
    return await this.usersService.create(createUsersDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto) {
    return await this.usersService.update(id, updateUsersDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}

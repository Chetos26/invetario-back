import { Injectable } from '@nestjs/common';
import { CreateHardwareDto } from './dto/create-hardware.dto';
import { UpdateHardwareDto } from './dto/update-hardware.dto';

@Injectable()
export class HardwareService {
  create(createHardwareDto: CreateHardwareDto) {
    return 'This action adds a new hardware';
  }

  findAll() {
    return `This action returns all hardware`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hardware`;
  }

  update(id: number, updateHardwareDto: UpdateHardwareDto) {
    return `This action updates a #${id} hardware`;
  }

  remove(id: number) {
    return `This action removes a #${id} hardware`;
  }
}

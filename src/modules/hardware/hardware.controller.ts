import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { HardwareService } from "./hardware.service";
import { UpdateHardwareDto } from "./dto/update-hardware.dto";
import { HardwareDto } from "./dto/hardware.dto";

@Controller("hardware")
export class HardwareController {
  constructor(private readonly hardwareService: HardwareService) {}

  @Post()
  create(@Body() createHardwareDto: HardwareDto) {
    return this.hardwareService.create(createHardwareDto);
  }

  @Get()
  findAll() {
    return this.hardwareService.findAll();
  }

  @Get(":id_h")
  findOne(@Param("id_h") id_h: string) {
    return this.hardwareService.findOne(id_h);
  }

  @Patch(":id_h")
  update(
    @Param("id_h") id_h: string,
    @Body() updateHardwareDto: UpdateHardwareDto,
  ) {
    return this.hardwareService.update(id_h, updateHardwareDto);
  }

  @Delete(":id_h")
  remove(@Param("id_h") id_h: string) {
    return this.hardwareService.remove(id_h);
  }
}

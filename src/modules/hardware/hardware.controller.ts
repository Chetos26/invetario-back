/* eslint-disable prettier/prettier */
import {Controller,Get,Post,Body,Patch,Param,Delete, UseInterceptors, UploadedFile, Inject} from "@nestjs/common";
import { HardwareService } from "./hardware.service";
import { UpdateHardwareDto } from "./dto/update-hardware.dto";
import { HardwareDto } from "./dto/hardware.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { fileFilter, renameImage } from "../helpers/image.helper";

@Controller("hardware")
export class HardwareController {
  constructor(
    @Inject(HardwareService) private readonly hardwareService: HardwareService
  ) {}
  
  /* @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './public', // Carpeta donde se guardará la imagen
      filename: renameImage,  // Función para renombrar la imagen
    }),
    fileFilter: fileFilter,   // Función para validar el formato de la imagen
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Llama a la función en el servicio para guardar la información de la imagen
    const uploadedFile = await this.hardwareService.uploadFile(file.filename);
    return { message: 'Archivo subido exitosamente', file: uploadedFile };
  } */

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

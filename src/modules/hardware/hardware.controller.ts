/* eslint-disable prettier/prettier */
import {Controller,Get,Post,Body,Patch,Param,Delete, UseInterceptors, UploadedFile, Inject,} from "@nestjs/common";
import { HardwareService } from "./hardware.service";
import { UpdateHardwareDto } from "./dto/update-hardware.dto";
import { HardwareDto } from "./dto/hardware.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("hardware")
export class HardwareController {
  constructor(
    @Inject(HardwareService)
    private readonly hardwareService: HardwareService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: '../uploads'
      /* file: renameImage */
    }),
    /* fileFilter: */
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File){
    console.log(file)
  }

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

  /*@Get(":id_h/image")
  async getImage(@Param("id_h") id_h: string, @Res() res: Response) {
    const imageBuffer = await this.hardwareService.getImageById(id_h); // Lógica para obtener la imagen desde la base de datos
    res.setHeader("Content-Type", "image/jpeg"); // Cambia el tipo de contenido según el formato de tu imagen
    res.send(imageBuffer);
  }*/
}

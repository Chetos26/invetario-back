import { Module } from "@nestjs/common";
import { HardwareService } from "./hardware.service";
import { HardwareController } from "./hardware.controller";
import { Hardware } from "./entities/hardware.entity";
import { Category } from "../categories/entities/category.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Hardware, Category])],
  controllers: [HardwareController],
  providers: [HardwareService],
})
export class HardwareModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TipoUsuarioController } from "./tipo_usuario.controller";
import { TipoUsuarioEntity } from "./tipo_usuario.entity";
import { TipoUsuarioService } from "./tipo_usuario.service";

@Module({
  imports: [TypeOrmModule.forFeature([TipoUsuarioEntity])],
  providers: [TipoUsuarioService],
  controllers: [TipoUsuarioController],
  exports: [TipoUsuarioService],
})
export class TipoUsuarioModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TipoUsuarioEntity } from "../tipo_usuario/tipo_usuario.entity";
import { TipoUsuarioModule } from "../tipo_usuario/tipo_usuario.module";
import { UsuarioController } from "./usuario.controller";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, TipoUsuarioEntity]),
    TipoUsuarioModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}

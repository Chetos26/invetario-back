/* eslint-disable prettier/prettier */
import { HttpCode, HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { UsersModule } from './modules/users/users.module';
import { HardwareModule } from './modules/hardware/hardware.module';
import { Configuration } from './config/config.keys';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { TipoUsuarioModule } from './modules/tipo_usuario/tipo_usuario.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
  imports: [AuthModule, ConfigModule, CategoriesModule, UsuarioModule, UsersModule, HardwareModule,TipoUsuarioModule,
    TypeOrmModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config:ConfigService){
            return {
                type: 'postgres',
                username: config.get(Configuration.USERNAME),
                password:config.get(Configuration.PASSWORD),
                host:config.get(Configuration.HOST),
                port: parseInt(config.get(Configuration.PORT)),
                database:config.get(Configuration.DATABASE),
                entities: [join(__dirname, '**', '*.entity.{ts,js}')],
                migrations: [__dirname + '/migrations/*.{.ts,.js}'],
                synchronize: true,
            }
        }
    }
    ),
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','public'),
      serveRoot: '/public',
    }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;
    constructor(private readonly _configService: ConfigService){
        AppModule.port = this._configService.get(Configuration['PORT'])
    }
}

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { UserModule } from './modules/user/user.module';
import { UsersModule } from './modules/users/users.module';
import { HardwareModule } from './modules/hardware/hardware.module';
import { Configuration } from './config/config.keys';
import { join } from 'path';

@Module({
  imports: [ConfigModule, CategoriesModule, UserModule, UsersModule, HardwareModule,
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

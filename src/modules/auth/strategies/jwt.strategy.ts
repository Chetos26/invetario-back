/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JWT_SECRET } from 'src/config/constants';
import { PayloadInterface } from '../payload.interface';
import { MessageDto } from 'src/common/message.dto';
import { UsuarioEntity } from 'src/modules/usuario/usuario.entity';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly authRepository: Repository<UsuarioEntity>,
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(JWT_SECRET)
        });
    }

    async validate(payload: PayloadInterface) {
        const { email, username } = payload
        const usuario = await this.authRepository.findOne({ where: [{ username: username }, { email: email }] });
        if(!usuario) return new UnauthorizedException(new MessageDto('Credenciales incorrectas'))
        return payload;
    }
}
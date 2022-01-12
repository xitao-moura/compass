import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport'
import { jwtConstants } from './constants';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from 'src/usuarios/interfaces/usuarios.schema';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Usuario', schema: UsuarioSchema}]),
    UsuariosModule,
    PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '43200s' }
    })
  ],
  providers: [
    AuthService,
    UsuariosService,
    LocalStrategy,
    JwtStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {}

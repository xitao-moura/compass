import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { UsuarioSchema } from './interfaces/usuarios.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Usuario', schema: UsuarioSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  providers: [UsuariosService],
  controllers: [UsuariosController]
})
export class UsuariosModule {}

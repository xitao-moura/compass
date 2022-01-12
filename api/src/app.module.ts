import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusModule } from './status/status.module';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ClientesModule } from './clientes/clientes.module';
import { CidadesModule } from './cidades/cidades.module';

@Module({
  imports: [
    StatusModule,
    UsuariosModule,
    MongooseModule.forRoot('mongodb://db/compass-uol'),
    AuthModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.uncolorize(),
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('CompassUol', { prettyPrint: true }),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/logs.log'
        })
      ]
    }),
    ClientesModule,
    CidadesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClienteSchema } from './interfaces/cliente.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Cliente', schema: ClienteSchema}])
  ],
  exports: [ClientesService],
  providers: [ClientesService],
  controllers: [ClientesController]
})
export class ClientesModule {}

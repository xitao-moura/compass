import { Module } from '@nestjs/common';
import { CidadesService } from './cidades.service';
import { CidadesController } from './cidades.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CidadeSchema } from './interfaces/cidade.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Cidade', schema: CidadeSchema}])
  ],
  exports: [CidadesService],
  providers: [CidadesService],
  controllers: [CidadesController]
})
export class CidadesModule {}

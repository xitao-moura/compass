import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { StatusSchema } from './interfaces/status.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Status', schema: StatusSchema}])
  ],
  exports: [StatusService],
  providers: [StatusService],
  controllers: [StatusController]
})
export class StatusModule {}

import { Controller, Get, Post, Body, UseGuards, Logger, Param, Delete, Put, Inject } from '@nestjs/common';
import { CreateStatusDto } from './dtos/created-status'
import { UpdateStatusDto } from './dtos/updated-status'
import { StatusService } from './status.service'
import { Status } from './interfaces/status.interface'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('v1/status')
export class StatusController {

    constructor(
        private readonly statusService: StatusService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async criarStatus(
        @Body() createStatusDto: CreateStatusDto
    ): Promise<Status>{
        return await this.statusService.criarStatus(createStatusDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async consultarStatus(): Promise<Status[]> {
        return await this.statusService.consultarTodosStatus();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:_id')
    async consultarStatusKey(@Param('_id') _id: string): Promise<Status[] | Status> {
        return await this.statusService.consultarStatusKey(_id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:_id')
    async atualizarStatus(
        @Body() updateStatusDto: UpdateStatusDto,
        @Param('_id') _id: string
    ): Promise<void> { 
        this.logger.log(`updateStatusDto: ${JSON.stringify(updateStatusDto)}`);
        await this.statusService.atualizarStatus(_id,updateStatusDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:_id')
    async deletarStatus(
        @Param('_id') _id: string
    ): Promise<void>{
        this.statusService.deletarStatus(_id)
    }

}
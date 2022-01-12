import { Body, Controller, Delete, Get, Inject, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CidadesService } from './cidades.service';
import { CreateCidadeDto } from './dtos/created-cidade';
import { UpdateCidadeDto } from './dtos/updated-cidade';
import { Cidade } from './interfaces/cidade.interface';

@Controller('v1/cidades')
export class CidadesController {
    constructor(
        private readonly cidadesService: CidadesService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async criarCidade(
        @Body() createCidadeDto: CreateCidadeDto
    ): Promise<Cidade>{
        return await this.cidadesService.criarCidade(createCidadeDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async consultarCidade(): Promise<Cidade[]> {
        return await this.cidadesService.consultarTodosCidade();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:_id')
    async consultarCidadeKey(@Param('_id') _id: string): Promise<Cidade[] | Cidade> {
        return await this.cidadesService.consultarCidadeKey(_id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:_id')
    async atualizarCidade(
        @Body() updateCidadeDto: UpdateCidadeDto,
        @Param('_id') _id: string
    ): Promise<void> { 
        this.logger.log(`updateCidadeDto: ${JSON.stringify(updateCidadeDto)}`);
        await this.cidadesService.atualizarCidade(_id,updateCidadeDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:_id')
    async deletarCidade(
        @Param('_id') _id: string
    ): Promise<void>{
        this.cidadesService.deletarCidade(_id)
    }
}

import { Body, Controller, Delete, Get, Inject, Logger, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dtos/created-cliente';
import { UpdateClienteDto } from './dtos/updated-cliente';
import { Cliente } from './interfaces/cliente.interface';

@Controller('v1/clientes')
export class ClientesController {
    constructor(
        private readonly clientesService: ClientesService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async criarCliente(
        @Body() createClienteDto: CreateClienteDto
    ): Promise<Cliente>{
        return await this.clientesService.criarCliente(createClienteDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async consultarCliente(
        @Query('nome') nome,
        @Query('_id') _id,
    ): Promise<Cliente[]> {
        return await this.clientesService.consultarTodosCliente(nome, _id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:_id')
    async consultarClienteKey(@Param('_id') _id: string): Promise<Cliente[] | Cliente> {
        return await this.clientesService.consultarClienteKey(_id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:_id')
    async atualizarCliente(
        @Body() updateClienteDto: any,
        @Param('_id') _id: string
    ): Promise<void> { 
        await this.clientesService.atualizarCliente(_id,updateClienteDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:_id')
    async deletarCliente(
        @Param('_id') _id: string
    ): Promise<void>{
        this.clientesService.deletarCliente(_id)
    }
}

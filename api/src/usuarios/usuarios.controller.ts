import { Body, Controller, Delete, Get, Inject, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUsuarioDto } from './dtos/create-usuarios';
import { UpdateUsuarioDto } from './dtos/update-usuarios';
import { Usuario } from './interfaces/usuarios.interface';
import { UsuariosService } from './usuarios.service';

@Controller('v1/usuarios')
export class UsuariosController {
    constructor(
        private readonly usuariosService: UsuariosService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async criarUsuario(
        @Body() createUsuarioDto: CreateUsuarioDto
    ): Promise<Usuario>{
        return await this.usuariosService.criarUsuario(createUsuarioDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async consultarUsuario(): Promise<Usuario[]> {
        return await this.usuariosService.consultarTodosUsuarios();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:_id')
    async consultarUsuariosKey(@Param('_id') _id: string): Promise<Usuario[] | Usuario> {
        return await this.usuariosService.consultarUsuarioKey(_id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:_id')
    async atualizarUsuario(
        @Body() updateUsuarioDto: UpdateUsuarioDto,
        @Param('_id') _id: string
    ): Promise<void> { 
        this.logger.log(`updateUsuarioDto: ${JSON.stringify(updateUsuarioDto)}`);
        await this.usuariosService.atualizarUsuario(_id,updateUsuarioDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:_id')
    async deletarUsuario(
        @Param('_id') _id: string
    ): Promise<void>{
        this.usuariosService.deletarUsuario(_id)
    }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEmail } from 'class-validator';

export class UpdateUsuarioDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nome: string
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    senha: string
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string
    updatedAt: Date
}
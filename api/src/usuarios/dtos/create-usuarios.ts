import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEmail } from 'class-validator';

export class CreateUsuarioDto {
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
    createdAt: Date
    updatedAt: Date
}
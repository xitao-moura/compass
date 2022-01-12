import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClienteDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nome: string
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    sexo: string
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    data_nascimento: Date
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    idade: number
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cidade: string
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string
    createdAt: Date
    updatedAt: Date
}
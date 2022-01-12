import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateClienteDto {
    @ApiProperty()
    nome: string
    @ApiProperty()
    sexo: string
    @ApiProperty()
    data_nascimento: Date
    @ApiProperty()
    idade: number
    @ApiProperty()
    cidade: string
    @ApiProperty()
    status: string
    updatedAt: Date
}
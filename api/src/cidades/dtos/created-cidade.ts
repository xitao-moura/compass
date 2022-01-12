import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCidadeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nome: string
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    estado: string
    createdAt: Date
    updatedAt: Date
}
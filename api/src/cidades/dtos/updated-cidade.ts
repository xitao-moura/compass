import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCidadeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nome: string
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    estado: string
    updatedAt: Date
}
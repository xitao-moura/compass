import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStatusDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nome: string
    updatedAt: Date
}
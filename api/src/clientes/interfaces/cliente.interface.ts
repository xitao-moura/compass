import { Document } from 'mongoose'

export interface Cliente extends Document {
    nome: string,
    sexo: string,
    data_nascimento: Date,
    idade: number,
    cidade: string,
    status: string,
    createdAt: Date,
    updatedAt: Date
}
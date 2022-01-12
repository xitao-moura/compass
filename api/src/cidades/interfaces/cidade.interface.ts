import { Document } from 'mongoose'

export interface Cidade extends Document {
    nome: string,
    estado: string,
    createdAt: Date,
    updatedAt: Date
}
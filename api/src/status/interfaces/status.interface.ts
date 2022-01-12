import { Document } from 'mongoose'

export interface Status extends Document {
    nome: string,
    createdAt: Date,
    updatedAt: Date
}
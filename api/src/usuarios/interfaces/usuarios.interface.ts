import { Document, ObjectId } from 'mongoose'

export interface Usuario extends Document {
    nome: string,
    email: string,
    senha: string,
    status: string,
    createdAt: Date,
    updatedAt: Date
}
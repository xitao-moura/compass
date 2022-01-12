import * as mongoose from 'mongoose';
import { utils } from '../../common/utils'

export const ClienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    data_nascimento: {
        type: Date,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    cidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cidade'
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status'
    },
    createdAt: {
        type: Date, 
        default: utils.dateCurrentDataBase()
    },
    updatedAt: {
        type: Date, 
        default: utils.dateCurrentDataBase()
    }
}, { timestamps: true, collection: 'clientes' });
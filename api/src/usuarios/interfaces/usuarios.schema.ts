import * as mongoose from 'mongoose';
import { utils } from '../../common/utils'

export const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
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
}, { timestamps: true, collection: 'usuarios' });
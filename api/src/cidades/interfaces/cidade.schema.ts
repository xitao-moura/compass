import * as mongoose from 'mongoose';
import { utils } from '../../common/utils'

export const CidadeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date, 
        default: utils.dateCurrentDataBase()
    },
    updatedAt: {
        type: Date, 
        default: utils.dateCurrentDataBase()
    }
}, { timestamps: true, collection: 'cidades' });
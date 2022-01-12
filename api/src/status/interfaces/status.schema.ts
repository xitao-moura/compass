import * as mongoose from 'mongoose';
import { utils } from '../../common/utils'

export const StatusSchema = new mongoose.Schema({
    nome: {
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
}, { timestamps: true, collection: 'status' });
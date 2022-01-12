import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { CreateStatusDto } from './dtos/created-status'
import { UpdateStatusDto } from './dtos/updated-status'
import { Status } from './interfaces/status.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'

@Injectable()
export class StatusService {

    constructor(
        @InjectModel('Status') private readonly statusModel: Model<Status>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {}

    async criarStatus(createStatusDto: CreateStatusDto): Promise<any> {
        const statusCriado = new this.statusModel(createStatusDto)
        statusCriado.save( (error, doc) => {
            console.log(doc)
            if(error){
                return error
            }
        })
    }

    async atualizarStatus(_id: string, updateStatusDto: UpdateStatusDto): Promise<Status> {
        const statusEncontrado = await this.statusModel.findOne({_id}).exec()
        if(!statusEncontrado){
            throw new BadRequestException(`Status com o _id ${_id} não encontrado`)
        }

        return await this.statusModel.findOneAndUpdate({_id: _id},{$set: updateStatusDto}).exec()
    }

    async consultarTodosStatus(): Promise<Status[]> {
        return await this.statusModel.find().exec()
    }

    async consultarStatusKey(_id: string): Promise<Status> {
        const vinculoEncontrado = await this.statusModel.findOne({_id}).exec()
        if(!vinculoEncontrado){
            throw new BadRequestException(`Status com o _id ${_id} não encontrado`)
        }
        return await this.statusModel.findOne({_id}).exec()
    }

    async deletarStatus(_id: string): Promise<any> {
        const vinculoEncontrado = await this.statusModel.findOne({_id}).exec()
        if(!vinculoEncontrado){
            throw new BadRequestException(`Status com o _id ${_id} não encontrado`)
        }
        await this.statusModel.deleteOne({_id}).exec()
    }
}
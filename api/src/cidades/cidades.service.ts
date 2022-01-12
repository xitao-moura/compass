import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreateCidadeDto } from './dtos/created-cidade';
import { UpdateCidadeDto } from './dtos/updated-cidade';
import { Cidade } from './interfaces/cidade.interface';

@Injectable()
export class CidadesService {
    constructor(
        @InjectModel('Cidade') private readonly cidadeModel: Model<Cidade>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {}

    async criarCidade(createCidadeDto: CreateCidadeDto): Promise<any> {
        const cidadeCriada = new this.cidadeModel(createCidadeDto)
        cidadeCriada.save( (error, doc) => {
            console.log(doc)
            if(error){
                return error
            }
        })

        return cidadeCriada
    }

    async atualizarCidade(_id: string, updateCidadeDto: UpdateCidadeDto): Promise<Cidade> {
        const cidadeEncontrado = await this.cidadeModel.findOne({_id}).exec()
        if(!cidadeEncontrado){
            throw new BadRequestException(`Cidade com o _id ${_id} não encontrado`)
        }

        return await this.cidadeModel.findOneAndUpdate({_id: _id},{$set: updateCidadeDto}).exec()
    }

    async consultarTodosCidade(nome, estado): Promise<Cidade[]> {
        let q = {
            nome: null,
            estado: null
        }

        if(nome){
            q.nome = nome
        }else{
            delete q.nome
        }

        if(estado){
            q.estado = estado
        }else{
            delete q.estado
        }
        return await this.cidadeModel.find(q).exec()
    }

    async consultarCidadeKey(_id: string): Promise<Cidade> {
        const cidadeEncontrado = await this.cidadeModel.findOne({_id}).exec()
        if(!cidadeEncontrado){
            throw new BadRequestException(`Cidade com o _id ${_id} não encontrado`)
        }
        return await this.cidadeModel.findOne({_id}).exec()
    }

    async deletarCidade(_id: string): Promise<any> {
        const cidadeEncontrado = await this.cidadeModel.findOne({_id}).exec()
        if(!cidadeEncontrado){
            throw new BadRequestException(`Cidade com o _id ${_id} não encontrado`)
        }
        await this.cidadeModel.deleteOne({_id}).exec()
    }
}

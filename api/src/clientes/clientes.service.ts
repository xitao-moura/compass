import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreateClienteDto } from './dtos/created-cliente';
import { UpdateClienteDto } from './dtos/updated-cliente';
import { Cliente } from './interfaces/cliente.interface';

@Injectable()
export class ClientesService {
    constructor(
        @InjectModel('Cliente') private readonly clienteModel: Model<Cliente>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {}

    async criarCliente(createClienteDto: CreateClienteDto): Promise<any> {
        const clienteCriado = new this.clienteModel(createClienteDto)
        clienteCriado.save( (error, doc) => {
            console.log(doc)
            if(error){
                return error
            }
        })

        return clienteCriado
    }

    async atualizarCliente(_id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
        const clienteEncontrado = await this.clienteModel.findOne({_id}).exec()
        if(!clienteEncontrado){
            throw new BadRequestException(`Cliente com o _id ${_id} não encontrado`)
        }

        return await this.clienteModel.findOneAndUpdate({_id: _id},{$set: updateClienteDto}).exec()
    }

    async consultarTodosCliente(): Promise<Cliente[]> {
        return await this.clienteModel.find().exec()
    }

    async consultarClienteKey(_id: string): Promise<Cliente> {
        const clienteEncontrado = await this.clienteModel.findOne({_id}).exec()
        if(!clienteEncontrado){
            throw new BadRequestException(`Cliente com o _id ${_id} não encontrado`)
        }
        return await this.clienteModel.findOne({_id}).exec()
    }

    async deletarCliente(_id: string): Promise<any> {
        const clienteEncontrado = await this.clienteModel.findOne({_id}).exec()
        if(!clienteEncontrado){
            throw new BadRequestException(`Cliente com o _id ${_id} não encontrado`)
        }
        await this.clienteModel.deleteOne({_id}).exec()
    }
}

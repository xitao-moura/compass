import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Usuario } from './interfaces/usuarios.interface';
import * as bcrypt from 'bcrypt'
import { CreateUsuarioDto } from './dtos/create-usuarios';
import { environment } from '../common/environment'
import { UpdateUsuarioDto } from './dtos/update-usuarios';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class UsuariosService {

    constructor(
        @InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {}

    async criarUsuario(createUsuarioDto: CreateUsuarioDto): Promise<any> {
        const hash = await bcrypt.hash(createUsuarioDto.senha, environment.security.saltRounds)
        createUsuarioDto.senha = hash
        const usuarioCriado = new this.usuarioModel(createUsuarioDto)
        usuarioCriado.save( (error, doc) => {
            console.log(doc)
            if(error){
                return error
            }
        })
    }

    async atualizarUsuario(_id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
        const usuarioEncontrado = await this.usuarioModel.findOne({_id}).exec()
        if(!usuarioEncontrado){
            throw new BadRequestException(`Usuario com o _id ${_id} não encontrado(a)`)
        }

        if(updateUsuarioDto.senha){
            const isMatch = await bcrypt.compare(updateUsuarioDto.senha, usuarioEncontrado.senha)
            if(isMatch === false){
                const hash = await bcrypt.hash(updateUsuarioDto.senha, environment.security.saltRounds)
                updateUsuarioDto.senha = hash
            }
        }

        return await this.usuarioModel.findOneAndUpdate({_id: _id},{$set: updateUsuarioDto})
        .populate('status')
        .exec()
    }

    async consultarTodosUsuarios(): Promise<Usuario[]> {
        return await this.usuarioModel.find()
        .populate('status')
        .exec()
    }

    async consultarUsuarioKey(_id: string): Promise<Usuario> {
        const usuarioEncontrado = await this.usuarioModel.findOne({_id}).exec()
        if(!usuarioEncontrado){
            throw new BadRequestException(`Usuario com o _id ${_id} não encontrado(a)`)
        }
        return await this.usuarioModel.findOne({_id})
        .populate('status')
        .exec()
    }

    async consultarUsuarioEmail(email: string){
        return await this.usuarioModel.findOne({ email })
        .populate('status')
        .exec()
    }

    async deletarUsuario(_id: string): Promise<any> {
        const usuarioEncontrado = await this.usuarioModel.findOne({_id}).exec()
        if(!usuarioEncontrado){
            throw new BadRequestException(`Usuario com o _id ${_id} não encontrado(a)`)
        }
        await this.usuarioModel.deleteOne({_id}).exec()
    }
}

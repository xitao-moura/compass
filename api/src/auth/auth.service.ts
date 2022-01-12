import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService} from '../usuarios/usuarios.service'
import * as bcrypt from 'bcrypt'
import { environment } from '../common/environment'

@Injectable()
export class AuthService {
    constructor(
        private usuariosService: UsuariosService,
        private jwtService: JwtService
    ){}

    async validadeUsuario(usuarioEmail: string, usuarioSenha: string){
        const usuario = await this.usuariosService.consultarUsuarioEmail(usuarioEmail)

        const isMatch = await bcrypt.compare(usuarioSenha, usuario.senha)

        if(usuario && isMatch === true){
            const { _id, nome, email } = usuario
            return { _id, nome, email }
        }
        return null
    }

    async login(usuario: any){
        const payload = { email: usuario.email, sub: usuario.sub }
        return {
            usuario: usuario,
            access_token: this.jwtService.sign(payload)
        }
    }
}

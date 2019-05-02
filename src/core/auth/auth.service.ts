import { Injectable } from '@angular/core';
import { ArmazenamentoGlobalService } from '../armazenamento-global/armazenamento-global.service';
import { MensagemService } from 'src/app/shared/mensagem/mensagem.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly storage: ArmazenamentoGlobalService,
        private readonly mensagemService: MensagemService) {
    }

    token;
    idSessao;
    redirectUrl;

    isLoggedIn(): boolean {
        this.token = this.storage.obter('login', 'sessionstorage');
        return this.token !== null;
    }

    refreshToken(dados) {
        if (this.token) {
            this.token = dados.Contexto[0].Token;
            this.storage.armazenar('login', this.token, 'sessionstorage');
        }
    }

    login(dados, millenium) {
        if (dados.Resposta[0].Status === 0 && millenium === false) {
            this.mensagemService.falha(dados.Resposta[0].Mensagem + ': ' + dados.Resposta[0].MensagemInterna);
        } else {
            this.token = dados.Contexto[0].Token;
            this.idSessao = dados.Contexto[0].IdSessao;
            this.storage.armazenar('idSessao', this.idSessao, 'sessionstorage');
            this.storage.armazenar('login', this.token, 'sessionstorage');
        }
    }

    logout() {
        this.token = null;
        this.storage.armazenar('login', null, 'sessionstorage');
    }

    getUser() {
        return this.storage.obter('usuarioLogado', 'sessionstorage');
    }
}

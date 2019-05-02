import { Injectable } from '@angular/core';
import { AlertaComponent } from './alerta/alerta.component';
import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';

@Injectable()
export class MensagemService {
  alertaComponent: AlertaComponent;
  confirmacaoComponent: ConfirmacaoComponent;

  constructor() { }

  sucesso(mensagem: string) {
    this.alert(mensagem, 'sucesso');
  }

  falha(mensagem: string) {
    this.alert(mensagem, 'erro');
  }

  informacao(mensagem: string) {
    this.alert(mensagem, 'informacao');
  }

  aviso(mensagem: string) {
    this.alert(mensagem, 'aviso');
  }

  private alert(mensagem, tipo) {
    this.alertaComponent.mensagem = mensagem;
    this.alertaComponent.tipo = tipo;
    this.alertaComponent.exibirMensagem();
  }

  confirm(
    mensagem: string,
    callBackOk: Function = null,
    callBackNok: Function = null,
    tipo: string = 'sucesso',
    opcoes: any = null,
    imagem?
  ) {
    this.confirmacaoComponent.exibirMensagem(
      mensagem,
      callBackOk,
      callBackNok,
      tipo,
      opcoes,
      imagem
    );
  }
}

export interface OptionsMsgConfirm {

  textoPersonalizado: {
    btnSim: string,
    btnNao: string,
    titulo: string
  };

}

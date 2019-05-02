import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html'
})
export class ConfirmacaoComponent implements OnInit {
  exibir = false;
  titulo = 'ALERTA';
  mensagem = '';
  imagem = '';
  tipo = '';
  textoBtnSim = 'SIM';
  textoBtnNao = 'NAO';

  private _fade = 500;

  private callbackOk: Function;
  private callbackNok: Function;

  @ViewChild('alerta') alerta: ElementRef;
  @ViewChild('btnSim') btnSim: ElementRef;
  @ViewChild('btnNao') btnNao: ElementRef;

  constructor() { }

  ngOnInit() { }

  exibirMensagem(
    mensagem: string,
    callBackOk: Function = null,
    callBackNok: Function = null,
    tipo: string = 'sucesso',
    opcoes: any = {
      textoPersonalizado: {
      }
    },
    imagem?
  ) {
    this.exibir = true;
    this.mensagem = mensagem;
    this.titulo = 'ALERTA';
    this.imagem = imagem;

    if (opcoes.textoPersonalizado.titulo) {
      this.titulo = opcoes.textoPersonalizado.titulo;
    }
    if (opcoes.textoPersonalizado.btnSim) {
      this.textoBtnSim = opcoes.textoPersonalizado.btnSim;
    }
    if (opcoes.textoPersonalizado.btnNao) {
      this.textoBtnNao = opcoes.textoPersonalizado.btnNao;
    }

    this.callbackOk = callBackOk;
    this.callbackNok = callBackNok;

    const tipoAlerta = this.obterClasseTipoAlerta(tipo);

    this.alerta.nativeElement.classList.remove('hide');
    this.btnNao.nativeElement.classList.add('btn-outline-' + tipoAlerta);
    this.btnSim.nativeElement.classList.add('btn-' + tipoAlerta);
  }

  cancelar() {
    this.fecharConfirmacao();
    if (this.callbackNok) {
      this.callbackNok();
    }
  }

  ok() {
    this.fecharConfirmacao();
    if (this.callbackOk) {
      this.callbackOk();
    }
  }

  private fecharConfirmacao() {
    this.alerta.nativeElement.classList.add('hide');
    this.btnNao.nativeElement.classList.remove('btn-outline-success');
    this.btnNao.nativeElement.classList.remove('btn-outline-warning');
    this.btnNao.nativeElement.classList.remove('btn-outline-error');
    this.btnNao.nativeElement.classList.remove('btn-outline-info');
    this.btnSim.nativeElement.classList.remove('btn-success');
    this.btnSim.nativeElement.classList.remove('btn-warning');
    this.btnSim.nativeElement.classList.remove('btn-error');
    this.btnSim.nativeElement.classList.remove('btn-info');
  }

  private obterClasseTipoAlerta(tipo: string) {
    if (tipo.toLocaleLowerCase() === 'sucesso') {
      return 'success';
    } else if (tipo.toLocaleLowerCase() === 'aviso') {
      return 'warning';
    } else if (tipo.toLocaleLowerCase() === 'erro') {
      return 'error';
    } else {
      return 'info';
    }
  }
}

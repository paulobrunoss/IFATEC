import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html'
})
export class AlertaComponent implements OnInit {
  mensagem = '';
  tipo = '';
  private _fade = 8000;

  constructor() { }

  ngOnInit() { }

  private obterClasseAlerta(tipo: string) {
    if (tipo.toLocaleLowerCase() === 'sucesso') {
      return 'alert-success';
    } else if (tipo.toLocaleLowerCase() === 'aviso') {
      return 'alert-warning';
    } else if (tipo.toLocaleLowerCase() === 'erro') {
      return 'alert-error';
    } else if (tipo.toLocaleLowerCase() === 'informacao') {
      return 'alert-info';
    } else {
      return 'alert-info';
    }
  }

  fecharMensagem() {
    const notificacao = document.getElementById('notificacao');
    if (notificacao) {
      notificacao.classList.remove('show');
      notificacao.classList.remove('alert-success');
      notificacao.classList.remove('alert-warning');
      notificacao.classList.remove('alert-error');
      notificacao.classList.remove('alert-info');
    }
  }

  exibirMensagem() {
    const notificacao = document.getElementById('notificacao');

    if (notificacao) {
      notificacao.classList.add('show');
      notificacao.classList.add(this.obterClasseAlerta(this.tipo));
    }

    setTimeout(() => {
      this.fecharMensagem();
    }, this._fade);
  }
}

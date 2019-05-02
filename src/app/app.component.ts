import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderService } from './shared/loader/loader.service';
import { LoaderComponent } from './shared/loader/loader.component';
import { Event as RouterEvent } from '@angular/router';
import { Router } from '@angular/router';
import { RouteConfigLoadEnd } from '@angular/router';
import { RouteConfigLoadStart } from '@angular/router';
import { MensagemService } from './shared/mensagem/mensagem.service';
import { AlertaComponent } from './shared/mensagem/alerta/alerta.component';
import { ConfirmacaoComponent } from './shared/mensagem/confirmacao/confirmacao.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(AlertaComponent) mensagem;
  @ViewChild(LoaderComponent) loader;

  public mostrarLoader: boolean;

  constructor(
    private readonly mensagemService: MensagemService,
    private readonly loaderService: LoaderService,
    private readonly router: Router
  ) {
    this.mostrarLoader = false;
    let asyncLoadCount = 0;

    this.router.events.subscribe(
      (event: RouterEvent): void => {
        if (event instanceof RouteConfigLoadStart) {
          asyncLoadCount++;
        } else if (event instanceof RouteConfigLoadEnd) {
          asyncLoadCount--;
        }
        this.mostrarLoader = !!asyncLoadCount;
        if (this.mostrarLoader === true) {
          this.loaderService.exibirLoader('CarregarModulo');
        } else {
          this.loaderService.fecharLoader('CarregarModulo');
        }
      }
    );
   }

  ngOnInit() {
    this.mensagemService.alertaComponent = this.mensagem;
    this.loaderService.loaderComponent = this.loader;

  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscriber, Subscription } from '../../../../../node_modules/rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit, OnDestroy {
  subParam: any;
  eventosdeRota: Subscription;
  renderizarHeader = true;
  menuHome: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // this.renderizarHeader = !this.buscarRotaFinal().data.esconderAppMain;

    // this.deveExibirHeader();

    // this.eventosdeRota = this.router.events.subscribe(navigation => {
    //   if (navigation instanceof NavigationEnd) {

    //     this.deveExibirHeader();

    //     // this.gerenciarWorkflow();
    //     // this.gerenciarTelaAtual();

    //   }
    // });
  }

  get idWorkFlow() {
    const rotaFinal = this.buscarRotaFinal();

    if (rotaFinal.params && rotaFinal.params.idWorkflow) {
      return rotaFinal.params.idWorkflow;
    } else {
      return undefined;
    }
  }

  get idTela() {
    const rotaFinal = this.buscarRotaFinal();

    if (rotaFinal.params && rotaFinal.params.idTela) {
      return rotaFinal.params.idTela;
    } else {
      return undefined;
    }
  }

  deveExibirHeader() {
    this.renderizarHeader = !this.buscarRotaFinal().data.esconderAppMain
    && !(this.buscarRotaFinal().queryParams.millenium !== undefined);
  }

  buscarRotaFinal() {
    let rota = this.route.snapshot;
    let scape = true;
    while (scape) {
      if (rota.firstChild) {
        rota = rota.firstChild;
      } else {
        scape = false;
      }
    }
    return rota;
  }

  /**
   * Metodo executado ao sair do mainComponent
   * @returns void
   */
  ngOnDestroy(): void {
    // Limpa o subiscribe após sair do mainComponent
    this.eventosdeRota.unsubscribe();
  }
}

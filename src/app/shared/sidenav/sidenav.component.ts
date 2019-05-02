import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ArmazenamentoGlobalService } from 'src/core/armazenamento-global/armazenamento-global.service';
import { FavoritoService } from './favorito.service';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent implements OnInit, OnDestroy {

  subscriptions = new Subscription();
  listaMenus: any;
  grupoSeguranca;
  menuFixo = false;
  sideMenuWidth: string;
  siafSidenavWidth: string;
  rotaAtual: any;
  hide: boolean;
  icon: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    public readonly router: Router,
    private readonly storage: ArmazenamentoGlobalService,
    private readonly favoritoService: FavoritoService,
    private loader: LoaderService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  verificarMenuFixo() {

    if (this.route.snapshot.data.menuFixo) {
      this.menuFixo = true;
      this.abrirMenuNaHome();
    } else {
      this.menuFixo = false;
      this.fecharMenu();
    }

    if (this.route.snapshot.data.recarregarMenu) {
      // this.buscaMenuNaApi();
    } else {
      this.buscaMenuNoStorage();
    }
  }

  /*Abre e fecha o Menu*/
  toggleCollapseMenu() {
    if (this.hide) {

      this.siafSidenavWidth = '0px';
      this.sideMenuWidth = '0px';
      document.getElementById('sideMenu').classList.remove('opened');
    } else {

      this.siafSidenavWidth = '100vw';
      this.sideMenuWidth = '255px';
      document.getElementById('sideMenu').classList.add('opened');
    }
    this.hide = !this.hide;
  }

  /*Abre o fecha o Menu quando um item é selecionado*/
  fecharMenu() {
    this.sideMenuWidth = '0px';
    document.getElementById('sideMenu').classList.remove('opened');
    this.siafSidenavWidth = '0px';
    this.siafSidenavWidth = '0px';
    this.hide = false;
  }

  buscaMenuNoStorage() {
    this.listaMenus = this.storage.obter('ListaMenu', 'sessionStorage')
      .filter(menu => menu.IndicadorMenu.toLocaleLowerCase() === 'ml');
  }


  abrirMenuNaHome() {
    this.sideMenuWidth = '255px';
    this.siafSidenavWidth = '0px';
  }

  verificaFavorito(IdTabela, MenuFavoritoUsuario) {
    const selecionado = {
      MenuParRef: IdTabela,
      UsuarioParRef: this.grupoSeguranca.UsuarioParRef
    };
    // remove o menu dos favoritos
    if (MenuFavoritoUsuario) {
      this.favoritoService.apagar(selecionado).subscribe(
        () => {
          // this.buscaMenuNaApi();
        }
      );
    } else {
      // adiciona o menu como favorito
      this.favoritoService.inserir(selecionado).subscribe(
        () => {
          // this.buscaMenuNaApi();
        }
      );
    }
  }

  navegar(idWorkflow) {
    const rotaFinal = this.location.path();
  }

}

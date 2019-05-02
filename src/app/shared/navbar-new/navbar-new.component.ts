import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/core/auth/auth.service';
import { ArmazenamentoGlobalService } from 'src/core/armazenamento-global/armazenamento-global.service';

@Component({
  selector: 'app-navbar-new',
  templateUrl: './navbar-new.component.html'
})
export class NavbarNewComponent implements OnInit {

  idiomaDefinido = 'pt-BR';
  selectIdioma = false;
  userMenu = false;
  subParam: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly storage: ArmazenamentoGlobalService,
    private router: Router
  ) { }

  usuario;

  ngOnInit() {
    this.usuario = this.storage.obter('GrupoSeguranca', 'sessionstorage');
  }


  definirIdioma(language) {
    this.idiomaDefinido = language;
  }

  logout() {
    // this.usuarioService.logout().subscribe(() => { });
    this.router.navigate(['/permissionamento/login']);
    this.authService.logout();
  }

  toggleIdioma() {
    this.selectIdioma = !this.selectIdioma;
    this.userMenu = false;
  }

  toggleUserMenu() {
    this.userMenu = !this.userMenu;
    this.selectIdioma = false;
  }
}

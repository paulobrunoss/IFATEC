import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  idiomaDefinido = 'pt-BR';

  constructor( private readonly router: Router,
              private readonly authService: AuthService) {}

  ngOnInit() {}

  definirIdioma(language) {
    this.idiomaDefinido = language;
  }

  logout() {
      this.router.navigate(['/permissionamento/login']);
      this.authService.logout();
  }
}

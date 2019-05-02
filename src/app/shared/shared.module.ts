import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MzModalModule, MzSelectModule, MzNavbarModule, MzDropdownModule, MzTooltipModule } from 'ngx-materialize';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarNewComponent } from './navbar-new/navbar-new.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ConfirmacaoComponent } from './mensagem/confirmacao/confirmacao.component';
import { LoaderComponent } from './loader/loader.component';
import { AlertaComponent } from './mensagem/alerta/alerta.component';

const components = [
  MainComponent,
  NavbarComponent,
  NavbarNewComponent,
  SidenavComponent,
  ConfirmacaoComponent,
  LoaderComponent,
  AlertaComponent
  // LocalizadorPacienteComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MzModalModule,
    MzSelectModule,
    MzDropdownModule,
    MzNavbarModule,
    ReactiveFormsModule,
    MzModalModule,
    MzTooltipModule,
  ],
  declarations: components,
  providers: [],
  exports: [components],
  bootstrap: [ ]
  // LocalizadorPacienteComponent]
})
export class SharedModule { }

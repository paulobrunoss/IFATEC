/**
 * Elemento que vai gerenciar todas as rotas do sistema.
 * Aqui é definido os caminhos para os componentes.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth/auth.guard';
import { MainComponent } from './shared/layouts/main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children:
      [
        {
          path: '',
          redirectTo: 'permissionamento/login',
          pathMatch: 'full'
        }
      ]
  },
  {
    path: 'permissionamento',
    loadChildren: '../feature/permissionamento/permissionamento.module#PermissionamentoModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

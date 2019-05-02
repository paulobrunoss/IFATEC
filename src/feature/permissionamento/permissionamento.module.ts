import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PermissionamentoRoutingModule } from './permissionamento-routing.module';
import { LoginComponent } from './login/login.component';
import { MzRadioButtonModule } from 'ngx-materialize';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    PermissionamentoRoutingModule,
    MzRadioButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [LoginComponent]
})
export class PermissionamentoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class CoreModule { }

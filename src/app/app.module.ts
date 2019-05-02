import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NgxMaskModule } from 'ngx-mask';
import { MzCheckboxModule, MzInputModule, MzSelectModule, MzTextareaModule, MzModalModule, MzBadgeModule } from 'ngx-materialize';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from 'src/core/core.module';
import { SettingsProvider } from 'src/core/providers/loaders-factory';
import { MensagemService } from './shared/mensagem/mensagem.service';
import { LoaderService } from './shared/loader/loader.service';
import { AuthGuard } from 'src/core/auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    NgxMaskModule,
    MzSelectModule,
    MzCheckboxModule,
    MzTextareaModule,
    MzModalModule,
    MzBadgeModule,
    MzInputModule,
    HttpClientModule,
  ],
  providers: [
    SettingsProvider,
    MensagemService, LoaderService, AuthGuard, ],
  bootstrap: [AppComponent]
})
export class AppModule { }

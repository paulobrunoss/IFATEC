import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GerenciadorComunicacao } from 'src/core/gerenciador-comunicacao/gerenciador-comunicacao.service';
import { MensagemService } from '../mensagem/mensagem.service';
import { LoaderService } from '../loader/loader.service';
import { ArmazenamentoGlobalService } from 'src/core/armazenamento-global/armazenamento-global.service';
import { HelperService } from '../helper/helper.service';
import { AuthService } from 'src/core/auth/auth.service';
import { FavoritoModel } from './favorito.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  private gc: GerenciadorComunicacao;

  constructor(
    private readonly http: HttpClient,
    private readonly loader: LoaderService,
    private readonly mensagem: MensagemService,
    private readonly helper: HelperService,
    protected readonly storage: ArmazenamentoGlobalService,
    private readonly auth: AuthService
  ) {
    this.gc = new GerenciadorComunicacao('menufavoritousuario', http, mensagem, loader, helper, storage, auth);
  }

  inserir(param): Observable<FavoritoModel[]> {
    return this.gc.post('inserir', param).pipe(map(data => data));
  }

  apagar(param): Observable<FavoritoModel[]> {
    return this.gc.post('apagar', param).pipe(map(data => data));
  }
}

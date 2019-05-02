import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { MensagemService } from 'src/app/shared/mensagem/mensagem.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { HelperService } from 'src/app/shared/helper/helper.service';
import { AuthService } from 'src/core/auth/auth.service';
import { ArmazenamentoGlobalService } from 'src/core/armazenamento-global/armazenamento-global.service';
import { GerenciadorComunicacao } from 'src/core/gerenciador-comunicacao/gerenciador-comunicacao.service';

export abstract class ACRUDService {
  constructor(
    protected readonly http: HttpClient,
    private readonly nomeModulo: string,
    protected readonly mensagemService: MensagemService,
    protected readonly loaderService: LoaderService,
    protected readonly helper: HelperService,
    protected readonly auth: AuthService,
    protected readonly storage: ArmazenamentoGlobalService
  ) {
    this.gc = new GerenciadorComunicacao(
      nomeModulo,
      http,
      mensagemService,
      loaderService,
      helper,
      storage,
      auth
    );
  }

  gc: GerenciadorComunicacao;

  consultarPorCodigoDescricaoStatus(param: any) {
    return this.gc.post('consultarcoddesc', param).pipe(map(data => data));
  }

  obterTodos(param: any) {
    return this.gc
      .post('listartodos', {
        FlagBusca: param
      })
      .pipe(map(data => data));
  }

  alterar(model: any) {
    model.UsuarioAlteracaoDR = this.auth.getUser().Login;

    return this.gc.post('alterar', model).pipe(
      map(data => {
        if (data) {
          this.mensagemService.sucesso('Alteração realizada com sucesso.');
        }
        return data;
      })
    );
  }


  criar(model: any) {
    model.UsuarioInclusaoDR = this.auth.getUser().Login;
    return this.gc.post('inserir', model).pipe(
      map(data => {
        if (data) {
          this.mensagemService.sucesso('Criação realizada com sucesso.');
        }
        return data;
      })
    );
  }

  salvar(model: any) {
    if (model.IdTabela) {
      model.UsuarioAlteracaoDR = this.auth.getUser().Login;
    } else {
      model.UsuarioInclusaoDR = this.auth.getUser().Login;
    }

    return this.gc.post('salvar', model).pipe(
      map(data => {
        if (data) {
          this.mensagemService.sucesso('Salvo com sucesso!');
        }
        return data;
      })
    );
  }

  /**
   *
   * @param param
   */
  consultar(param) {
    return this.gc.post('consultar', param).pipe(map(data => data));
  }

  consultarporid(param) {
    return this.gc.post('consultarporid', param).pipe(map(data => data));
  }

  consultardisponiveis(param) {
    return this.gc.post('consultardisponiveis', param).pipe(map(data => data));
  }
  /**
   *
   * @param param
   */
  consultarAgrupado(param: any) {
    return this.gc.post('consultaragrupado', param).pipe(map(data => data));
  }

  /**
   * Usado para filtrar os registros exatamente com os parametros passados.
   * @param param
   */
  consultarEspecifico(param: any) {
    return this.gc.post('consultarespecifico', param).pipe(map(data => data));
  }

  excluir(param: any) {
    return this.gc.post('apagar', param).pipe(map(data => data));
  }
}

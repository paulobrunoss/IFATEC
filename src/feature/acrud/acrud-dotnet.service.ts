import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ArmazenamentoGlobalService } from 'src/core/armazenamento-global/armazenamento-global.service';
import { AuthService } from 'src/core/auth/auth.service';
import { HelperService } from 'src/app/shared/helper/helper.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { MensagemService } from 'src/app/shared/mensagem/mensagem.service';
import { GerenciadorComunicacao } from 'src/core/gerenciador-comunicacao/gerenciador-comunicacao.service';

export abstract class ACRUDDotNetService {
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

    alterar(model: any) {
        model.UsuarioAlteracaoDR = this.auth.getUser().Login;

        return this.gc.put('alterar', model).pipe(
            map(data => {
                if (data) {
                    this.mensagemService.sucesso('Alteração realizada com sucesso.');
                }
                return data;
            })
        );
    }

    inserir(model: any) {
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

    consultar(param) {
        return this.gc.get('Consultar', param).pipe(map(data => data));
    }

    obterTodos(param: any) {
        return this.gc.get('listartodos', param)
          .pipe(map(data => data));
      }

    excluir(param: any) {
        return this.gc.delete(param).pipe(map(data => data));
    }
}

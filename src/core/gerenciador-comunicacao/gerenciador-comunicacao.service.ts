import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { timeout } from 'rxjs/operators';
import { MensagemService } from 'src/app/shared/mensagem/mensagem.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { HelperService } from 'src/app/shared/helper/helper.service';
import { ArmazenamentoGlobalService } from '../armazenamento-global/armazenamento-global.service';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { ResultModel } from 'src/feature/acrud/result.model';

export class GerenciadorComunicacao {
    constructor(
        private readonly nomeModulo: string,
        private readonly http: HttpClient,
        private readonly mensagemService: MensagemService,
        private readonly loaderService: LoaderService,
        private readonly helper: HelperService,
        private readonly storage: ArmazenamentoGlobalService,
        private readonly authService: AuthService,
    ) { }

    private baseUrl = environment.apiSettings.baseUrl;
    private localUrl = environment.apiSettings.localUrl;

    post(metodo: string, obj) {
        const token = this.storage.obter('login', 'sessionstorage');
        const idSessao = this.storage.obter('idSessao', 'sessionStorage');
        const guid = this.helper.createGuid();
        this.loaderService.exibirLoader(guid);
        let header = new HttpHeaders();
        header = header.append('Content-Type', 'application/json');
        if (idSessao) {
            header = header.append('idSessao', idSessao);
        }
        if (token) {
            header = header.append('token', token);
        }

        const url = this.baseUrl + '/' + this.nomeModulo + '/' + metodo;
        return this.http
            .post(url, obj, { headers: header })
            .pipe(
                map((data: ResultModel) => {
                    this.loaderService.fecharLoader(guid);
                    if (metodo === 'logar' || metodo === 'logarmill') {
                        this.authService.login(data, metodo === 'logarmill');
                    }
                    if (data) {

                        if (data.Resposta[0].Status === 1) {

                                // Resposta quando não houver uma sessão valida
                                this.validaSessao(data, metodo);

                                return data.Objeto;
                        }

                        // Resposta quando não houver uma sessão valida
                        this.validaSessao(data, metodo);

                        this.mensagemService.falha(data.Resposta[0].Mensagem);
                        return null;
                    } else {
                        this.loaderService.fecharLoader(guid);
                        this.mensagemService.falha('Serviço temporariamente indisponível.');
                        return null;
                    }
                }),
                catchError((res: HttpErrorResponse | any) => {
                    this.loaderService.fecharLoader(guid);
                    this.mensagemService.falha('Serviço temporariamente indisponível.');
                    return observableThrowError(res.error);
                })
            );
    }

    get(metodo: string, params) {
        const token = this.storage.obter('login', 'sessionstorage');
        const idSessao = this.storage.obter('idSessao', 'sessionStorage');
        const guid = this.helper.createGuid();
        this.loaderService.exibirLoader(guid);
        const hash = parseInt((Math.random() * 100000).toFixed(), 10);
        params = params + '&hash=' + hash;
        let header = new HttpHeaders();
        header = header.append('Content-Type', 'application/json');
        if (idSessao) {
            header = header.append('idSessao', idSessao);
        }
        if (token) {
            header = header.append('token', token);
        }

        return this.http
            .get(this.baseUrl + '/' + this.nomeModulo + '/' + metodo +  encodeURI(params), { headers: header })
            .pipe(map((data: any) => {
                this.loaderService.fecharLoader(guid);
                if (data) {
                    return data;
                } else {
                    return null;
                }
            }), catchError((res: HttpErrorResponse | any) => {
                this.loaderService.fecharLoader(guid);
                this.mensagemService.falha('Serviço temporariamente indisponível.');
                return observableThrowError(res.error);
            }));
    }


    put(metodo: string, obj) {
        const guid = this.helper.createGuid();
        this.loaderService.exibirLoader(guid);
        // tslint:disable-next-line:prefer-const
        let header = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http
            .put(this.baseUrl + '/'  + this.nomeModulo + '/' + metodo, obj, { headers: header })
            .pipe(
                map((data: any) => {
                    this.loaderService.fecharLoader(guid);
                    return data;
                }),
                catchError((res: HttpErrorResponse | any) => {
                    this.loaderService.fecharLoader(guid);
                    this.mensagemService.falha('Serviço temporariamente indisponível.');
                    return observableThrowError(res.error);
                })
            );
    }

    patch(metodo: string, obj) {
        const guid = this.helper.createGuid();
        this.loaderService.exibirLoader(guid);
        return this.http
            .patch(this.baseUrl + '/' + this.nomeModulo + '/' + metodo, obj)
            // .patch(this.baseUrl + '/'  + this.nomeModulo + '/' + metodo, obj)
            .pipe(
                map((data: any) => {
                    this.loaderService.fecharLoader(guid);
                    if (data) {
                        return data;
                    } else {
                        return null;
                    }
                }),
                catchError((res: HttpErrorResponse | any) => {
                    this.loaderService.fecharLoader(guid);
                    this.mensagemService.falha('Serviço temporariamente indisponível.');
                    return observableThrowError(res.error);
                })
            );
    }

    delete(param) {
        const guid = this.helper.createGuid();
        this.loaderService.exibirLoader(guid);
        return this.http
            // .delete(this.baseUrl + '/' + this.nomeModulo + '/' + param)
            .delete(this.baseUrl + '/' + this.nomeModulo + '/' + param)
            .pipe(
                map((data: any) => {
                    this.loaderService.fecharLoader(guid);
                    if (data) {
                        this.mensagemService.sucesso('Item deletado com sucesso');
                        return data;
                    } else {
                        return null;
                    }
                }),
                catchError((res: HttpErrorResponse | any) => {
                    this.loaderService.fecharLoader(guid);
                    this.mensagemService.falha('Serviço temporariamente indisponível.');
                    return observableThrowError(res.error);
                })
            );
    }

    validaSessao(data: any, metodo: string) {
        const sessaoInvalida = data.Resposta.find(res => res.CodigoMensagem ? res.CodigoMensagem.toString() === '120' : false);
        if (sessaoInvalida) {
            this.mensagemService.falha(sessaoInvalida.Mensagem);
        }
    }


}





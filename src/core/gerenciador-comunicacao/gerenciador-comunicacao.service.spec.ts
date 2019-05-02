import { GerenciadorComunicacao } from './gerenciador-comunicacao.service';
import { HttpClient } from '@angular/common/http';
import { TestingEngine, mockTypes } from '@testing/testing-engine/testing-engine';
import { MensagemService } from '@shared/mensagem/mensagem.service';
import { LoaderService } from '@shared/loader/loader.service';
import { HelperService } from '@shared/helper/helper.service';
import { AuthService } from '@core/auth/auth.service';
import { ArmazenamentoGlobalService } from '@core/armazenamento-global/armazenamento-global.service';

describe('GerenciadorComunicacao', () => {
    let gerenciador;
    const engine = new TestingEngine(jasmine);

    const mock = {
        services: {
            http: engine.createServiceMockInstance(HttpClient, {
                post: mockTypes.function
            }),
            mensagem: engine.createServiceMockInstance(MensagemService),
            loader: engine.createServiceMockInstance(LoaderService),
            helper: engine.createServiceMockInstance(HelperService),
            auth: engine.createServiceMockInstance(AuthService),
            storage: engine.createServiceMockInstance(ArmazenamentoGlobalService)
        },
        returns: {
            sucesso: {
                Resposta: [
                    {
                        Status: 1,
                        MensagemInterna: 'Sucesso'
                    }
                ],
                Objeto: {}
            },
            falha: {
                Resposta: [
                    {
                        Status: 2,
                        Mensagem: 'Erro'
                    }
                ],
                Objeto: {}
            },
            erro: {
                error: 'Erro'
            }
        }
    };

    beforeEach(() => {
        gerenciador = new GerenciadorComunicacao(
            'module-teste',
            mock.services.http,
            mock.services.mensagem,
            mock.services.loader,
            mock.services.helper,
            mock.services.storage,
            mock.services.auth
        );
    });

    afterEach(() => {
        mock.services.mensagem.falha.calls.reset();
    });

    it('deverá ser criado.', () => {
        expect(gerenciador).toBeTruthy();
    });

    describe('ao fazer post ->', () => {
        it('quando não obter um retorno do serviço, deverá exibir mensagem de "Serviço temporariamente indisponível."', () => {
            const returned = engine.createObservableMock();

            returned.addExecution(
                undefined,
                true
            );

            mock.services.http.setPostReturn(returned);

            gerenciador.post('', {});
            expect(mock.services.mensagem.falha).toHaveBeenCalledWith('Serviço temporariamente indisponível.');
        });

        it('quando obter um erro de negócio no retorno do serviço, deverá exibir mensagem de negócio específica.', () => {
            const returned = engine.createObservableMock();

            returned.addExecution(
                mock.returns.falha,
                true
            );

            mock.services.http.setPostReturn(returned);

            gerenciador.post('', {});
            expect(mock.services.mensagem.falha).toHaveBeenCalledWith('Erro');
        });

        it('quando receber uma resposta do serviço com status code diferente de 200, deverá exibir mensagem de erro.', () => {
            const returned = engine.createObservableMock();

            returned.addExecution(
                mock.returns.erro,
                false
            );

            mock.services.http.setPostReturn(returned);

            gerenciador.post('', {});
            expect(mock.services.mensagem.falha).toHaveBeenCalledWith('Serviço temporariamente indisponível.');
        });
    });
});

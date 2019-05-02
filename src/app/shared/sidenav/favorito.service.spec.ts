import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { TestingEngine, mockTypes } from '@testing/testing-engine/testing-engine';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MensagemService } from '@shared/mensagem/mensagem.service';
import { LoaderService } from '@shared/loader/loader.service';
import { AuthService } from '@core/auth/auth.service';
import { HelperService } from '@shared/helper/helper.service';
import { ArmazenamentoGlobalService } from '@core/armazenamento-global/armazenamento-global.service';
import { environment } from '../../../environments/environment';
import { FavoritoService } from '@shared/sidenav/favorito.service';
import { FavoritoModel } from '@shared/sidenav/favorito.model';

const engine = new TestingEngine(jasmine);

const modelInserir = new FavoritoModel();
modelInserir.UsuarioInclusaoDR = undefined;

const modelAlterar = new FavoritoModel();
modelAlterar.UsuarioAlteracaoDR = undefined;

const baseUrl = environment.apiSettings.baseUrl;

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
  constants: {
    favorito: {
      Resposta: [{
        Status: 1,
        Mensagem: 'Sucesso'
      }],
      Objeto: [
        new FavoritoModel()
      ]
    },
    chamadaApi: {
      pathObterTodos: baseUrl + 'listartodos',
      pathInserir: baseUrl + 'inserir',
      pathAlterar: baseUrl + 'alterar',
      pathConsultarPor: baseUrl + 'consultar',
      modelInserir: modelInserir,
      modelAlterar: modelAlterar,
      modelObterTodos: { FlagBusca: {} }
    },
    header: { headers: new HttpHeaders().append('Content-Type', 'application/json') }
  }
};

describe('FavoritoService', () => {
  const oldResetTestingModule = TestBed.resetTestingModule;
  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
      providers: [
        FavoritoService,
        { provide: HttpClient, useValue: mock.services.http },
        { provide: MensagemService, useValue: mock.services.mensagem },
        { provide: LoaderService, useValue: mock.services.loader },
        { provide: HelperService, useValue: mock.services.helper },
        { provide: AuthService, useValue: mock.services.auth },
        { provide: ArmazenamentoGlobalService, useValue: mock.services.storage }
      ]
    });
    await TestBed.compileComponents();

    // prevent Angular from resetting testing module
    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  afterAll(() => {
    // reinstate resetTestingModule method
    TestBed.resetTestingModule = oldResetTestingModule;
    TestBed.resetTestingModule();
  });

  afterEach(() => {
    mock.services.http.post.calls.reset();
  });

  it('deverá ser criado.', inject([FavoritoService], (service: FavoritoService) => {
    expect(service).toBeTruthy();
  }));

  describe('ao inserir ->', () => {
    it('deverá chamar o serviço passando os parâmetros corretos.', fakeAsync(() => {
      inject([FavoritoService], (service: FavoritoService) => {
        const returned = engine.createObservableMock();

        returned.addExecution(
          mock.constants.favorito,
          true
        );

        returned.addExecution(
          mock.constants.favorito,
          true
        );

        returned.addExecution(
          mock.constants.favorito.Objeto,
          true
        );

        mock.services.http.setPostReturn(returned);
        service.inserir({});
        expect(mock.services.http.setPostReturn(returned)).toBeUndefined();
      })();
    }));
  });

   describe('ao apagar ->', () => {
    it('deverá chamar o serviço passando os parâmetros corretos.', fakeAsync(() => {
      inject([FavoritoService], (service: FavoritoService) => {
        const returned = engine.createObservableMock();

        returned.addExecution(
          mock.constants.favorito,
          true
        );

        returned.addExecution(
          mock.constants.favorito,
          true
        );

        returned.addExecution(
          mock.constants.favorito.Objeto,
          true
        );

        mock.services.http.setPostReturn(returned);
        service.apagar({});
        expect(mock.services.http.setPostReturn(returned)).toBeUndefined();
      })();
    }));
  });
});

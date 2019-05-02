import { ACRUDService } from './acrud.service';
import { TestingEngine, mockTypes } from '@testing/testing-engine/testing-engine';
import { MensagemService } from '@shared/mensagem/mensagem.service';
import { LoaderService } from '@shared/loader/loader.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HelperService } from '@shared/helper/helper.service';
import { AuthService } from '@core/auth/auth.service';
import { ArmazenamentoGlobalService } from '@core/armazenamento-global/armazenamento-global.service';
import { BaseModel } from '@feature/code-tables/comum/base.model';

/**
 * Para testar a classe abstrata devemos criar uma classe que
 * extenda suas funcionalidades para conseguir testá-las.
 */
class TestClass extends ACRUDService {
  constructor(
    _http: HttpClient,
    _nomeModulo: string,
    _mensagemService: MensagemService,
    _loaderService: LoaderService,
    _helper: HelperService,
    _auth: AuthService,
    _storage: ArmazenamentoGlobalService
  ) {
    super(_http, _nomeModulo, _mensagemService, _loaderService, _helper, _auth, _storage);
  }
}

const engine = new TestingEngine(jasmine);

const mock = {
  services: {
    mensagem: engine.createServiceMockInstance(MensagemService),
    loader: engine.createServiceMockInstance(LoaderService),
    http: engine.createServiceMockInstance(HttpClient, {
      post: mockTypes.function
    }),
    helper: engine.createServiceMockInstance(HelperService),
    auth: engine.createServiceMockInstance(AuthService),
    storage: engine.createServiceMockInstance(ArmazenamentoGlobalService)
  },
  constants: {
    modulo: 'modulo-default'
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
          MensagemInterna: 'Erro',
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

const acrudChild = new TestClass(
  mock.services.http,
  mock.constants.modulo,
  mock.services.mensagem,
  mock.services.loader,
  mock.services.helper,
  mock.services.auth,
  mock.services.storage
);

describe('AcrudService', () => {
  afterEach(() => {
    mock.services.mensagem.sucesso.calls.reset();
    mock.services.mensagem.falha.calls.reset();
  });

  it('deverá ser criado', () => {
    expect(acrudChild).toBeDefined();
  });

  describe('ao alterar ->', () => {
    it('quando obter um retorno do serviço, deverá enviar a mensagem de sucesso.', () => {
      const returned = engine.createObservableMock();

      returned.addExecution(
        mock.returns.sucesso,
        true
      );

      returned.addExecution(
        {},
        true
      );

      mock.services.http.setPostReturn(returned);

      acrudChild.alterar(new FilhoBaseModel());
      expect(mock.services.mensagem.sucesso).toHaveBeenCalled();
    });

    it('quando não obter uma propriedade "Objeto" retorno do serviço, não deverá enviar a mensagem de sucesso.', () => {
      const returned = engine.createObservableMock();

      returned.addExecution(
        mock.returns.sucesso,
        true
      );

      returned.addExecution(
        undefined,
        true
      );

      mock.services.http.setPostReturn(returned);

      acrudChild.alterar(new FilhoBaseModel());
      expect(mock.services.mensagem.sucesso).not.toHaveBeenCalled();
    });
  });

  describe('ao criar ->', () => {
    it('quando obter um retorno do serviço, deverá enviar a mensagem de sucesso.', () => {
      const returned = engine.createObservableMock();

      returned.addExecution(
        mock.returns.sucesso,
        true
      );

      returned.addExecution(
        {},
        true
      );

      mock.services.http.setPostReturn(returned);

      acrudChild.criar(new FilhoBaseModel());
      expect(mock.services.mensagem.sucesso).toHaveBeenCalled();
    });

    it('quando não obter uma propriedade "Objeto" retorno do serviço, não deverá enviar a mensagem de sucesso.', () => {
      const returned = engine.createObservableMock();

      returned.addExecution(
        mock.returns.sucesso,
        true
      );

      returned.addExecution(
        undefined,
        true
      );

      mock.services.http.setPostReturn(returned);

      acrudChild.criar(new FilhoBaseModel());
      expect(mock.services.mensagem.sucesso).not.toHaveBeenCalled();
    });
  });

  describe('ao obter todos ->', () => {
    it('o serviço deverá retornar a lista de itens.', (done) => {
      const returned = engine.createObservableMock();

      returned.addExecution(
        mock.returns.sucesso,
        true
      );

      mock.services.http.setPostReturn(returned);

      acrudChild.obterTodos({}).pipe(map((data => {
        expect(data).toBeDefined();
        done();
      })));
    });
  });

  describe('ao obter todos ->', () => {
    it('o serviço deverá retornar a lista de itens.', (done) => {
      const returned = engine.createObservableMock();

      returned.addExecution(
        mock.returns.sucesso,
        true
      );

      mock.services.http.setPostReturn(returned);

      acrudChild.obterTodos({}).pipe(map((data => {
        expect(data).toBeDefined();
        done();
      })));
    });
  });

  describe('ao consultar por código, descrição e status ->', () => {
    it('o serviço deverá retornar a lista de itens filtrada.', (done) => {
      const returned = engine.createObservableMock();

      returned.addExecution(
        mock.returns.sucesso,
        true
      );

      mock.services.http.setPostReturn(returned);

      acrudChild.consultarPorCodigoDescricaoStatus({}).pipe(map((data => {
        expect(data).toBeDefined();
        done();
      })));
    });
  });
});


class FilhoBaseModel extends BaseModel {
}

import { TestBed, inject } from '@angular/core/testing';

import { ArmazenamentoGlobalService } from './armazenamento-global.service';

describe('ArmazenamentoGlobalService', () => {
  const oldResetTestingModule = TestBed.resetTestingModule;
  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
      providers: [ArmazenamentoGlobalService]
    });
    // prevent Angular from resetting testing module
    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  afterAll(() => {
    // reinstate resetTestingModule method
    TestBed.resetTestingModule = oldResetTestingModule;
    TestBed.resetTestingModule();
  });

  it('deverá ser criado.', inject([ArmazenamentoGlobalService], (service: ArmazenamentoGlobalService) => {
    expect(service).toBeTruthy();
  }));

  describe('ao armazenar o valor ->', () => {
    it('caso passe como parâmetro o o método "LOCALSTORAGE", deverá gravar o valor no armazenamento local do navegador.',
      inject([ArmazenamentoGlobalService], (service: ArmazenamentoGlobalService) => {
        service.armazenar('teste', { object: 'teste' }, 'localstorage');

        expect(JSON.parse(window.localStorage.getItem('teste'))).toEqual({ object: 'teste' });
      }));

    it('caso passe como parâmetro o o método "SESSIONSTORAGE", deverá gravar o valor na sessão do navegador.',
      inject([ArmazenamentoGlobalService], (service: ArmazenamentoGlobalService) => {
        service.armazenar('teste', { object: 'teste' }, 'sessionstorage');

        expect(JSON.parse(window.sessionStorage.getItem('teste'))).toEqual({ object: 'teste' });
      }));

    it('caso passe como parâmetro o o método "MEMORYSTORAGE", deverá gravar o valor na memória da aplicação.',
      inject([ArmazenamentoGlobalService], (service: ArmazenamentoGlobalService) => {
        service.armazenar('teste', { object: 'teste' }, 'memorystorage');

        expect(service.obter('teste', 'memorystorage')).toEqual({ object: 'teste' });
      }));
  });

  describe('ao obter o valor ->', () => {
    it('caso passe como parâmetro o o método "LOCALSTORAGE", deverá receber o valor vindo do armazenamento local do navegador.',
      inject([ArmazenamentoGlobalService], (service: ArmazenamentoGlobalService) => {
        window.localStorage.setItem('teste', JSON.stringify({ object: 'teste' }));

        expect(service.obter('teste', 'localstorage')).toEqual({ object: 'teste' });
      }));

    it('caso passe como parâmetro o o método "SESSIONSTORAGE", deverá receber o valor vindo da sessão do navegador.',
      inject([ArmazenamentoGlobalService], (service: ArmazenamentoGlobalService) => {
        window.sessionStorage.setItem('teste', JSON.stringify({ object: 'teste' }));

        expect(service.obter('teste', 'sessionStorage')).toEqual({ object: 'teste' });
      }));

    it('caso passe como parâmetro o o método "MEMORYSTORAGE", deverá receber o valor vindo da memória da aplicação.',
      inject([ArmazenamentoGlobalService], (service: ArmazenamentoGlobalService) => {
        service.armazenar('teste', { object: 'teste' }, 'memorystorage');

        expect(service.obter('teste', 'memorystorage')).toEqual({ object: 'teste' });
      }));
  });

  describe('ao remover o valor ->', () => {
    it('caso passe como parâmetro o o método "MEMORYSTORAGE", deverá receber o valor vindo da memória da aplicação.',
      inject([ArmazenamentoGlobalService], (service: ArmazenamentoGlobalService) => {
        service.remover('teste', 'memorystorage');

        expect(service.obter('teste', 'memorystorage')).toEqual({ object: 'teste' });
      }));
  });
});

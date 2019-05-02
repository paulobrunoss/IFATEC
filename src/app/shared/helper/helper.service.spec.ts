import { TestBed, inject } from '@angular/core/testing';

import { HelperService } from './helper.service';
import { TestingEngine } from '@testing/testing-engine/testing-engine';
import { MensagemService } from '@shared/mensagem/mensagem.service';

const engine = new TestingEngine(jasmine);

const mensagemService = engine.createServiceMockInstance(MensagemService);

describe('HelperService', () => {
  const oldResetTestingModule = TestBed.resetTestingModule;
  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
      providers: [
        HelperService,
        { provide: MensagemService, useValue: mensagemService }
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


  it('Deverá ser criado', inject([HelperService], (service: HelperService) => {
    expect(service).toBeTruthy();
  }));

  describe('Converte para  o formato americano ->', () => {
    it('o texto sera adaptado para o formato americano', inject([HelperService], (service: HelperService) => {
      expect(service.converterDataEnUS('30/12/2018')).toBe('2018-12-30');
    }));

    it('quando passar um valor inválido, deverá retornar um valor vazio.', inject([HelperService], (service: HelperService) => {
      expect(service.converterDataEnUS('12/30/2018')).toBe('');
    }));

    it('quando passar um valor em branco, deverá retornar um valor vazio.', inject([HelperService], (service: HelperService) => {
      expect(service.converterDataEnUS('')).toBe('');
    }));
  });

  describe('Converte para  o formato brasileiro ->', () => {
    it('o texto sera adaptado para o formato brasileiro', inject([HelperService], (service: HelperService) => {
      expect(service.converterDataPtBR('2018-12-30')).toBe('30/12/2018');
    }));

    it('quando passar um valor inválido, deverá retornar um valor vazio.', inject([HelperService], (service: HelperService) => {
      expect(service.converterDataPtBR('2018-30-12')).toBe('');
    }));

    it('quando passar um valor inválido, deverá retornar um valor vazio.', inject([HelperService], (service: HelperService) => {
      expect(service.converterDataPtBR('')).toBe('');
    }));
  });

  describe('Adicionar rolagem ao component de modal ->', () => {
    const getCss = {};
    const modal = {
      getCss: getCss,
      css: (att, value) => {
        getCss[att] = value;
      }
    };

    it('deve mudar o overflow do body', inject([HelperService], (service: HelperService) => {
      const body = document.querySelector('body');
      service.adicionarRolagem(modal);
      expect(body.style.overflow).toEqual('auto');
    }));

    it('deve mudar o overflow do body', inject([HelperService], (service: HelperService) => {
      service.adicionarRolagem(modal);
      expect(modal.getCss['position']).toEqual('absolute');
    }));

  });

});

import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';

import { InternationalizationService } from './internationalization.service';
import { constants } from 'perf_hooks';

const mock = {
  constants: {
    ptBr: 'pt-BR',
    enUs: 'en-US'
  }
};

describe('InternationalizationService', () => {
  const oldResetTestingModule = TestBed.resetTestingModule;
  beforeAll(done =>
    (async () => {
      TestBed.configureTestingModule({
        providers: [InternationalizationService]
      });
      await TestBed.compileComponents();

      // prevent Angular from resetting testing module
      TestBed.resetTestingModule = () => TestBed;
    })()
      .then(done)
      .catch(done.fail));

  afterAll(() => {
    // reinstate resetTestingModule method
    TestBed.resetTestingModule = oldResetTestingModule;
    TestBed.resetTestingModule();
  });

  it('deverá ser criado.', inject(
    [InternationalizationService],
    (service: InternationalizationService) => {
      expect(service).toBeTruthy();
    }
  ));

  describe('ao recuperar o idioma ->', () => {
    it('deverá devolver o valor do idioma atual.', inject(
      [InternationalizationService],
      (service: InternationalizationService) => {
        expect(service.getLanguage()).toBe(mock.constants.ptBr);
      }
    ));
  });

  describe('ao definir o idioma ->', () => {
    it('deverá emitir um evento passando o idioma definido "Ingles".', done => {
      inject(
        [InternationalizationService],
        (service: InternationalizationService) => {
          service.onLanguageChanged.subscribe(language => {
            expect(language).toBe(mock.constants.ptBr);
            done();
          });
          service.setLanguage(mock.constants.ptBr);
        }
      )();
    });
  });

});

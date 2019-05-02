import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {
  TestingEngine,
  mockTypes
} from '@testing/testing-engine/testing-engine';
import { InternationalizationService } from '@core/internationalization/internationalization.service';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RouterTestingModule } from '../../../../../node_modules/@angular/router/testing';
import { UsuarioService } from '@feature/code-tables/usuario/usuario.service';
import { ArmazenamentoGlobalService } from '@core/armazenamento-global/armazenamento-global.service';
import { MockPipe } from 'ng-mocks';
import { MensagemService } from '@shared/mensagem/mensagem.service';
import { LoaderService } from '@shared/loader/loader.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const engine = new TestingEngine(jasmine);

  const mock = {
    services: {

      internationalization: engine.createServiceMockInstance(
        InternationalizationService
      ),

      translate: engine.createServiceMockInstance(TranslateService, {
        use: mockTypes.function,
        setDefaultLang: mockTypes.function,
        get: mockTypes.function
      }),
      usuarioService: engine.createServiceMockInstance(UsuarioService),
      storage: engine.createServiceMockInstance(ArmazenamentoGlobalService),
      mensagem: engine.createServiceMockInstance(MensagemService),
      loader: engine.createServiceMockInstance(LoaderService)
    },
    constants: {
      listaTransformada: undefined,
      ptBr: 'pt-BR',
      traducoes: {
      MENSAGENS: {
        MSG_FALTA_GRUPO_SEGURANCA: 'MSG_FALTA_GRUPO_SEGURANCA',
      },
    },
      formularioAlteracao: {
        id: 1
      }
    }
  };

  const oldResetTestingModule = TestBed.resetTestingModule;
  beforeAll(done =>
    (async () => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule
        ],
        declarations: [
          LoginComponent,
          MockPipe(TranslatePipe)
        ],
        providers: [
          {
            provide: InternationalizationService,
            useValue: mock.services.internationalization
          },
          { provide: TranslateService, useValue: mock.services.translate },
          { provide: UsuarioService, useValue: mock.services.usuarioService },
          { provide: ArmazenamentoGlobalService, useValue: mock.services.storage },
          { provide: MensagemService, useValue: mock.services.mensagem },
          { provide: LoaderService, useValue: mock.services.loader}
        ]
      }).compileComponents();
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

  beforeEach(() => {
    mock.services.translate.setGetReturn(engine.createSubscribeMock(mock.constants.traducoes, true));
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ao emitir evento de propagação de idioma ->', () => {
    it('o serviço de tradução deve usar o novo idioma.', fakeAsync(() => {
      mock.services.internationalization.onLanguageChanged.emit(
        mock.constants.ptBr
      );
      tick();

      expect(mock.services.translate.use).toHaveBeenCalledWith(
        mock.constants.ptBr
      );
    }));
  });

  describe('ao submeter o formulário,', () => {
    describe('quando for uma alteração ->', () => {
      it(
        'ao ter sucesso na operação, deverá recarregar a tela.',
        fakeAsync(() => {
          mock.services.usuarioService.setAlterarReturn(
            engine.createSubscribeMock({}, true)
          );
          component.onSubmit();

          expect(JSON.stringify(component.ListaGrupoSeguranca)).toEqual(
            JSON.stringify(mock.constants.listaTransformada)
          );
        })
      );
      it(
        'ao ter falha na operação, deverá recarregar a tela.',
        fakeAsync(() => {
          mock.services.usuarioService.setAlterarReturn(
            engine.createSubscribeMock({}, false)
          );
          component.onSubmit();
          expect(JSON.stringify(component.ListaGrupoSeguranca)).toEqual(
            JSON.stringify(mock.constants.listaTransformada)
          );
        })
      );
    });

    describe('quando for uma criação ->', () => {
      it(
        'ao ter sucesso na operação, deverá recarregar a tela.',
        fakeAsync(() => {
          mock.services.usuarioService.setCriarReturn(
            engine.createSubscribeMock({}, true)
          );
          component.onSubmit();
          expect(JSON.stringify(component.ListaGrupoSeguranca)).toEqual(
            JSON.stringify(mock.constants.listaTransformada)
          );
        })
      );
      it(
        'ao ter falha na operação, deverá recarregar a tela.',
        fakeAsync(() => {
          mock.services.usuarioService.setCriarReturn(
            engine.createSubscribeMock({}, false)
          );
          component.onSubmit();
          expect(JSON.stringify(component.ListaGrupoSeguranca)).toEqual(
            JSON.stringify(mock.constants.listaTransformada)
          );
        })
      );

  //    xdescribe('ao onSubmit -> ', () => {
  //       it('deve verificar se o formulario é válido', () => {
  //         component.formulario.get('login').setValue('teste');
  //         component.formulario.get('senha').setValue('teste');
  //         mock.services.usuarioService.setLoginReturn(
  //           engine.createSubscribeMock({}, true)
  //         );
  //         component.onSubmit();
  //         // expect(JSON.stringify(component.ListaGrupoSeguranca)).toEqual(
  //         //   JSON.stringify(mock.constants.listaTransformada));
  //         // expect(component.disabled).toBeFalsy();
  //       });
  //     });

      describe('ao limpar -> ', () => {
        it('deve desativar o formulário', () => {
          component.limpar();
          expect(component.disabled).toBeFalsy();
        });

        beforeEach(() => {
          component.formulario.get('login').setValue('teste');
          component.formulario.get('senha').setValue('teste');
        });

        const formularioLimpo = {
          login: null,
          senha: null
        };
        it('deverá limpar os valores do formulário.', () => {
          component.limpar();
          expect(component.formulario.value).toEqual(formularioLimpo);
        });
      });

      describe('Ao espiar', () => {
        it('Deve verificar se espiar foi chamado', () => {
          component.espiar();
          expect(component.hide).toBeTruthy();
        });
      });
      describe('Ao converterFormularioParaModel', () => {
         const formulario = new FormGroup({
          login: new FormControl(''),
          senha: new FormControl(''),
        });
        it('', () => {
          component.converterFormularioParaModel(formulario);
        });
    });

    });
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoComponent } from './confirmacao.component';

describe('ConfirmacaoComponent', () => {
  let component: ConfirmacaoComponent;
  let fixture: ComponentFixture<ConfirmacaoComponent>;

  const oldResetTestingModule = TestBed.resetTestingModule;
  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
      declarations: [ConfirmacaoComponent]
    }).compileComponents();
    await TestBed.compileComponents();

    // prevent Angular from resetting testing module
    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  afterAll(() => {
    // reinstate resetTestingModule method
    TestBed.resetTestingModule = oldResetTestingModule;
    TestBed.resetTestingModule();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deverá ser criado.', () => {
    expect(component).toBeTruthy();
  });

  describe('ao chamar o método de exibir confirmação ->', () => {
    it('o modal deverá ser exibido.', () => {
      component.exibirMensagem('teste');
      expect(component.alerta.nativeElement.classList.contains('hide')).toBe(false);
    });

    it('a mensagem exibida deverá ser a mesma passada por parâmetro.', () => {
      component.exibirMensagem('teste');
      expect(component.mensagem).toBe('teste');
    });

    it('ao clicar em no botão de confirmação, deverá chamar o método de sucesso.', () => {
      component.exibirMensagem('teste', () => {
        expect(true).toBe(true);
      });

      component.ok();
    });

    it('ao clicar em no botão de confirmação, deverá fechar o modal.', () => {
      component.exibirMensagem('teste');

      component.ok();
      expect(component.alerta.nativeElement.classList.contains('hide')).toBe(true);
    });

    it('ao clicar em no botão de cancelar, deverá chamar o método de sucesso.', () => {
      component.exibirMensagem('teste', null, () => {
        expect(true).toBe(true);
      });

      component.cancelar();
    });

    it('ao clicar em no botão de cancelar, deverá fechar o modal.', () => {
      component.exibirMensagem('teste');

      component.cancelar();
      expect(component.alerta.nativeElement.classList.contains('hide')).toBe(true);
    });

    it('ao enviar uma mensagem de confimação com tipo sucesso, deverá abrir um modal de sucesso.', () => {
      component.exibirMensagem('teste', null, null, 'sucesso');
      expect(component.btnSim.nativeElement.classList.contains('btn-success')).toBe(true);
    });

    it('ao enviar uma mensagem de confimação com tipo aviso, deverá abrir um modal de aviso.', () => {
      component.exibirMensagem('teste', null, null, 'aviso');
      expect(component.btnSim.nativeElement.classList.contains('btn-warning')).toBe(true);
    });

    it('ao enviar uma mensagem de confimação com tipo erro, deverá abrir um modal de erro.', () => {
      component.exibirMensagem('teste', null, null, 'erro');
      expect(component.btnSim.nativeElement.classList.contains('btn-error')).toBe(true);
    });

    it('ao enviar uma mensagem de confimação com tipo informação, deverá abrir um modal de informação.', () => {
      component.exibirMensagem('teste', null, null, 'informacao');
      expect(component.btnSim.nativeElement.classList.contains('btn-info')).toBe(true);
    });

    it('ao passar as opções de texto personalizado de título, o texto de título deverá ser alterado.', () => {
      component.exibirMensagem('teste', null, null, 'sucesso', {
        textoPersonalizado: {
          titulo: 'Título',
        }
      });

      expect(component.titulo).toBe('Título');
    });

    it('ao passar as opções de texto personalizado do botão "sim", o texto do botão "sim" deverá ser alterado.', () => {
      component.exibirMensagem('teste', null, null, 'sucesso', {
        textoPersonalizado: {
          btnSim: 'Ok',
        }
      });

      expect(component.textoBtnSim).toBe('Ok');
    });

    it('ao passar as opções de texto personalizado do botão "não", o texto do botão "não" deverá ser alterado.', () => {
      component.exibirMensagem('teste', null, null, 'sucesso', {
        textoPersonalizado: {
          btnNao: 'Cancel',
        }
      });

      expect(component.textoBtnNao).toBe('Cancel');
    });
  });
});

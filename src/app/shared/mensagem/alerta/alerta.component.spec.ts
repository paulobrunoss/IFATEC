import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaComponent } from './alerta.component';
import { debug } from 'util';

describe('AlertaComponent', () => {
  let component: AlertaComponent;
  let fixture: ComponentFixture<AlertaComponent>;

  const oldResetTestingModule = TestBed.resetTestingModule;
  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
      declarations: [AlertaComponent]
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
    fixture = TestBed.createComponent(AlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deverá ser criado.', () => {
    expect(component).toBeTruthy();
  });

  describe('ao chamar o alerta de sucesso ->', () => {
    it('deverá apresentar a mensagem conforme o parâmetro.', () => {
      component.mensagem = 'teste';
      component.tipo = 'sucesso';
      component.exibirMensagem();

      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement.querySelector('#notificacao');
      const result = compiled.classList.contains('show') && compiled.classList.contains('alert-success');

      expect(result).toBeTruthy();
    });
  });

  // describe('ao chamar o alerta de erro ->', () => {
  //   it('deverá apresentar a mensagem conforme o parâmetro.', () => {
  //     component.mensagem = 'teste';
  //     component.tipo = 'erro';
  //     component.exibirMensagem();

  //     fixture.detectChanges();
  //     const compiled = fixture.debugElement.nativeElement.querySelector('#notificacao');
  //     const result = compiled.classList.contains('show') && compiled.classList.contains('alert-error');

  //     expect(result).toBeTruthy();
  //   });
  // });

  // describe('ao chamar o alerta de aviso ->', () => {
  //   it('deverá apresentar a mensagem conforme o parâmetro.', () => {
  //     component.mensagem = 'teste';
  //     component.tipo = 'aviso';
  //     component.exibirMensagem();

  //     fixture.detectChanges();
  //     const compiled = fixture.debugElement.nativeElement.querySelector('#notificacao');
  //     const result = compiled.classList.contains('show') && compiled.classList.contains('alert-warning');

  //     expect(result).toBeTruthy();
  //   });
  // });

  describe('ao chamar o alerta de informação ->', () => {
    it('deverá apresentar a mensagem conforme o parâmetro.', () => {
      component.mensagem = 'teste';
      component.tipo = 'informacao';
      component.exibirMensagem();

      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement.querySelector('#notificacao');
      const result = compiled.classList.contains('show') && compiled.classList.contains('alert-info');

      expect(result).toBeTruthy();
    });
  });

  describe('ao chamar o alerta sem parâmetro de tipo ->', () => {
    it('deverá apresentar a mensagem como uma informação.', () => {
      component.mensagem = 'teste';
      component.tipo = '';
      component.exibirMensagem();

      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement.querySelector('#notificacao');
      const result = compiled.classList.contains('show') && compiled.classList.contains('alert-info');

      expect(result).toBeTruthy();
    });
  });

  describe('ao chamar qualquer alerta ->', () => {
    xit('deverá fechar após 3 segundos.', (done) => {
      component.mensagem = 'teste';
      component.tipo = '';
      component.exibirMensagem();
      component['_fade'] = 1000;

      setTimeout(() => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const result = compiled.querySelector('#notificacao').classList.contains('fade');
        expect(result).toBeTruthy();

        done();
      }, 1500);
    });
  });
  describe('Ao fecharMensagem ->', () => {
    it('', () => {
      const notificacao = document.getElementById('notificacao');
      component.fecharMensagem();
      expect(notificacao).toBeTruthy();
    });
});
});

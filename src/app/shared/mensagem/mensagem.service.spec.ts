import { TestBed, inject, ComponentFixture } from '@angular/core/testing';

import { MensagemService } from './mensagem.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-alerta',
  template: ''
})
class AlertaComponent {
  mensagem = '';
  tipo = '';

  fecharMensagem() {
  }

  exibirMensagem(tempo: number) {
  }
}

@Component({
  selector: 'app-confirmacao',
  template: ''
})
class ConfirmacaoComponent {
  exibir = false;
  titulo = 'ALERTA';
  mensagem = '';
  tipo = '';
  textoBtnSim = 'SIM';
  textoBtnNao = 'NAO';

  @ViewChild('alerta') alerta: ElementRef;
  @ViewChild('btnSim') btnSim: ElementRef;
  @ViewChild('btnNao') btnNao: ElementRef;

  constructor() { }

  exibirMensagem(
    mensagem: string,
    callBackOk: Function = null,
    callBackNok: Function = null,
    tipo: string = 'sucesso',
    opcoes: any = null
  ) {
    this.mensagem = mensagem;
  }

}

@Component({
  selector: 'app-loader-tester',
  template: '<app-confirmacao></app-confirmacao><app-alerta></app-alerta>'
})
class MensagemTesterComponent implements OnInit {
  @ViewChild(AlertaComponent) testAlertaComponent;
  @ViewChild(ConfirmacaoComponent) testConfirmacaoComponent;

  constructor(private service: MensagemService) {
  }

  ngOnInit(): void {
    this.service.confirmacaoComponent = this.testConfirmacaoComponent;
    this.service.alertaComponent = this.testAlertaComponent;
  }
}

describe('MensagemService', () => {
  let component: MensagemTesterComponent;
  let fixture: ComponentFixture<MensagemTesterComponent>;

  const oldResetTestingModule = TestBed.resetTestingModule;
  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
      providers: [MensagemService],
      declarations: [
        MensagemTesterComponent,
        ConfirmacaoComponent,
        AlertaComponent
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


  beforeEach(() => {
    fixture = TestBed.createComponent(MensagemTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deverá ser criado.', inject([MensagemService], (service: MensagemService) => {
    expect(service).toBeTruthy();
  }));

  it('o componente de teste deverá estar instanciado.', inject([MensagemService], (service: MensagemService) => {
    expect(component).toBeTruthy();
  }));

  it('o componente de alerta deverá estar instanciado no serviço.', inject([MensagemService], (service: MensagemService) => {
    expect(service.alertaComponent).toBeTruthy();
  }));

  it('o componente de confirmação deverá estar instanciado no serviço.', inject([MensagemService], (service: MensagemService) => {
    expect(service.confirmacaoComponent).toBeTruthy();
  }));

  describe('ao chamar o método de exibir alerta de sucesso ->', () => {
    it('deverá chamar exibir a mensagem passada.', inject([MensagemService], (service: MensagemService) => {
      service.sucesso('teste');
      expect(service.alertaComponent.mensagem).toBe('teste');
    }));

    it('deverá chamar o alerta de sucesso.', inject([MensagemService], (service: MensagemService) => {
      service.sucesso('teste');
      expect(service.alertaComponent.tipo).toBe('sucesso');
    }));
  });

  describe('ao chamar o método de exibir alerta de falha ->', () => {
    it('deverá chamar exibir a mensagem passada.', inject([MensagemService], (service: MensagemService) => {
      service.falha('teste');
      expect(service.alertaComponent.mensagem).toBe('teste');
    }));

    it('deverá chamar o alerta de falha.', inject([MensagemService], (service: MensagemService) => {
      service.falha('teste');
      expect(service.alertaComponent.tipo).toBe('erro');
    }));
  });

  describe('ao chamar o método de exibir alerta de informação ->', () => {
    it('deverá chamar exibir a mensagem passada.', inject([MensagemService], (service: MensagemService) => {
      service.informacao('teste');
      expect(service.alertaComponent.mensagem).toBe('teste');
    }));

    it('deverá chamar o alerta de informação.', inject([MensagemService], (service: MensagemService) => {
      service.informacao('teste');
      expect(service.alertaComponent.tipo).toBe('informacao');
    }));
  });

  describe('ao chamar o método de exibir alerta de aviso ->', () => {
    it('deverá chamar exibir a mensagem passada.', inject([MensagemService], (service: MensagemService) => {
      service.aviso('teste');
      expect(service.alertaComponent.mensagem).toBe('teste');
    }));

    it('deverá chamar o alerta de aviso.', inject([MensagemService], (service: MensagemService) => {
      service.aviso('teste');
      expect(service.alertaComponent.tipo).toBe('aviso');
    }));
  });

  describe('ao chamar o método de confirmar ->', () => {
    it('deverá chamar exibir o modal de confirmação.', inject([MensagemService], (service: MensagemService) => {
      service.confirm('teste', () => { }, () => { }, 'teste', {});
      expect(service.alertaComponent.mensagem).toBe('');
    }));

    it('deverá chamar exibir o modal de confirmação com os parâmetros padrão.', inject([MensagemService], (service: MensagemService) => {
      service.confirm('teste');
      expect(service.alertaComponent.mensagem).toBe('');
    }));
  });
});

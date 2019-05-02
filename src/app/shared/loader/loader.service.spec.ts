import { TestBed, inject, ComponentFixture } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import { ViewChild, OnInit, Component } from '@angular/core';
import { } from '@shared/loader/loader.component';

@Component({
  selector: 'app-loader',
  template: ''
})
class LoaderComponent {
  loaders = [];
  exibirLoader(name) {
    this.loaders.push(name);
  }

  fecharLoader(name) {
    this.loaders = this.loaders.filter(item => item !== name);
  }
}

@Component({
  selector: 'app-loader-tester',
  template: '<app-loader></app-loader>'
})
class LoaderTesterComponent implements OnInit {
  @ViewChild(LoaderComponent) testLoaderComponent;

  constructor(private service: LoaderService) {
  }

  ngOnInit(): void {
    this.service.loaderComponent = this.testLoaderComponent;
  }
}

describe('LoaderService', () => {
  let component: LoaderTesterComponent;
  let fixture: ComponentFixture<LoaderTesterComponent>;

  const oldResetTestingModule = TestBed.resetTestingModule;
  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
      providers: [LoaderService],
      declarations: [
        LoaderTesterComponent,
        LoaderComponent
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
    fixture = TestBed.createComponent(LoaderTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deverá ser criado.', inject([LoaderService], (service: LoaderService) => {
    expect(service).toBeTruthy();
  }));

  it('o componente de teste deverá estar instanciado.', inject([LoaderService], (service: LoaderService) => {
    expect(component).toBeTruthy();
  }));

  it('o componente de loader deverá estar instanciado no serviço.', inject([LoaderService], (service: LoaderService) => {
    expect(service.loaderComponent).toBeTruthy();
  }));

  describe('ao exibir loader', () => {
    it('deverá chamar o método de exibir loader do componente.', inject([LoaderService], (service: LoaderService) => {
      service.exibirLoader('');
      expect(service.loaderComponent.loaders.length).toBeGreaterThan(0);
    }));
  });

  describe('ao fechar loader', () => {
    it('deverá chamar o método de exibir loader do componente.', inject([LoaderService], (service: LoaderService) => {
      service.exibirLoader('');
      service.fecharLoader('');
      expect(service.loaderComponent.loaders.length).toBe(0);
    }));
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@core/auth/auth.service';
import { ArmazenamentoGlobalService } from '@core/armazenamento-global/armazenamento-global.service';
import { InternationalizationService } from '@core/internationalization/internationalization.service';
import { TestingEngine } from '@testing/testing-engine/testing-engine';
import { NavbarComponent } from '@shared/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { routes } from '@testing/app-routing.module.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMockComponent } from '@testing/component.mock';



const engine = new TestingEngine(jasmine);
const mock = {
    services: {
        auth: engine.createServiceMockInstance(AuthService),
        internationalization: engine.createServiceMockInstance(InternationalizationService),
    },
    constants: {
      ptBr: 'pt-BR'
    }
};

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;


    const oldResetTestingModule = TestBed.resetTestingModule;
    beforeAll(done => (async () => {

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(routes)
            ],
            declarations: [
                NavbarComponent,
                AppMockComponent
            ],
            providers: [
                { provide: AuthService, useValue: mock.services.auth },
                { provide: InternationalizationService, useValue: mock.services.internationalization },
            ]
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
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve ser criado', () => {
        expect(component).toBeTruthy();
    });

    describe('ao definir idioma.', () => {
      it('o idioma definido devera ser o mesmo escolhido', () => {
            component.definirIdioma('pt-BR');
            expect(component.idiomaDefinido).toBe('pt-BR');
        });
    });

    describe('Ao deslogar', () => {
        it('', () => {
           const component2 = <any>component;
           component2.router.navigate = jasmine.createSpy('navigate');
           component.logout();
           expect(mock.services.auth.logout).toHaveBeenCalled();
        });
    });
});







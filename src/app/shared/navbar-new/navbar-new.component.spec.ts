import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingEngine } from '@testing/testing-engine/testing-engine';
import { NavbarNewComponent } from '@shared/navbar-new/navbar-new.component';
import { TranslateMockPipe } from '@testing/translate/translate-mock.pipe';
import { MzDropdownComponent, MzDropdownItemComponent } from 'ngx-materialize';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '@testing/app-routing.module.mock';
import { AuthService } from '@core/auth/auth.service';
import { InternationalizationService } from '@core/internationalization/internationalization.service';
import { ArmazenamentoGlobalService } from '@core/armazenamento-global/armazenamento-global.service';
import { AppMockComponent } from '@testing/component.mock';
import { UsuarioService } from '@feature/code-tables/usuario/usuario.service';


// private readonly router: Router,


const engine = new TestingEngine(jasmine);
const mock = {
    services: {
        armazenamentoGlobalService: engine.createServiceMockInstance(ArmazenamentoGlobalService),
        auth: engine.createServiceMockInstance(AuthService),
        internationalization: engine.createServiceMockInstance(InternationalizationService),
        usuario: engine.createServiceMockInstance(UsuarioService)
    },
    constants: {
        ptBr: 'pt-BR'
    }
};

describe('NavbarNewComponent', () => {
    let component: NavbarNewComponent;
    let fixture: ComponentFixture<NavbarNewComponent>;


    const oldResetTestingModule = TestBed.resetTestingModule;

    beforeAll(done => (async () => {

        TestBed.configureTestingModule({
            declarations: [
                NavbarNewComponent,
                TranslateMockPipe,
                MzDropdownComponent,
                MzDropdownItemComponent,
                AppMockComponent
            ],
            imports: [
                RouterTestingModule.withRoutes(routes)

            ],
            providers: [
                { provide: AuthService, useValue: mock.services.auth },
                { provide: InternationalizationService, useValue: mock.services.internationalization },
                { provide: ArmazenamentoGlobalService, useValue: mock.services.armazenamentoGlobalService },
                { provide: UsuarioService, useValue: mock.services.usuario }
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
        mock.services.usuario.setLogoutReturn(engine.createSubscribeMock('', true));

        fixture = TestBed.createComponent(NavbarNewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('deve ser criado', () => {
        expect(component).toBeTruthy();
    });

    describe('Ao deslogar', () => {
        it('', () => {
            const component2 = <any>component;
            component2.router.navigate = jasmine.createSpy('navigate');
            component.logout();
            expect(mock.services.auth.logout).toHaveBeenCalled();
        });
    });

    describe('Ao definir um idioma ->', () => {

        it('O idioma definido deve ser o escolhido', () => {
            component.definirIdioma('pt-BR');
            expect(component.idiomaDefinido).toBe('pt-BR');
        });
    });

    describe('Ao trocar o idioma ->', () => {

        it('O userMenu deverá ser igual a false', () => {
            component.toggleIdioma();
            expect(component.userMenu).toBeFalsy();
        });

        it('O idioma selecionado deverá ser trocado', () => {
            const selectIdiomaState = component.selectIdioma;
            component.toggleIdioma();
            expect(component.selectIdioma).not.toBe(selectIdiomaState);
        });

    });

    describe('Ao trocar o menu ->', () => {

        it('O idioma selecionado deverá ser igual a false', () => {
            component.toggleUserMenu();
            expect(component.selectIdioma).toBeFalsy();
        });

        it('Deve trocar o valor de UserMenu', () => {
            const userMenuState = component.userMenu;
            component.toggleUserMenu();
            expect(component.userMenu).not.toBe(userMenuState);
        });

    });
});

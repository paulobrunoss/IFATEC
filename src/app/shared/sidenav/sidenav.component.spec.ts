import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingEngine } from '@testing/testing-engine/testing-engine';
import { ArmazenamentoGlobalService } from '@core/armazenamento-global/armazenamento-global.service';
import { FavoritoService } from '@shared/sidenav/favorito.service';
import { WorkflowService } from '@shared/api/menu/workflow.service';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';
import { SidenavComponent } from '@shared/sidenav/sidenav.component';
import { Input, Directive } from '../../../../node_modules/@angular/core';
import { routes } from '@testing/app-routing.module.mock';
import { AppMockComponent } from '@testing/component.mock';
import { GrupoSegurancaService } from '@feature/code-tables/grupo-seguranca/grupo-seguranca.service';
import { LoaderService } from '@shared/loader/loader.service';
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[mz-tooltip]'
})
export class MockMzTooltipDirective {
    @Input() tooltip;
    @Input() position;
    @Input() html;
    @Input() delay;
}

const engine = new TestingEngine(jasmine);
const mocks = {
    services: {
        grupoSegurancaService: engine.createServiceMockInstance(GrupoSegurancaService),
        storage: engine.createServiceMockInstance(ArmazenamentoGlobalService),
        favoritoService: engine.createServiceMockInstance(FavoritoService),
        workflowService: engine.createServiceMockInstance(WorkflowService),
        loader: engine.createServiceMockInstance(LoaderService)
    },
    constants: {
        listaItens: {
            ListaMenu: [
                { IdTabela: 1, IndicadorMenu: 'ml' },
                { IdTabela: 2, IndicadorMenu: 'ml' },
                { IdTabela: 3, IndicadorMenu: 'mp' }
            ]
        },
        ptBr: 'pt-BR',
        traducoes: {
            ALERTA: 'Alerta',
            SIM: 'Sim',
            NAO: 'Não',
            MENSAGENS: {
                MSG_CONFIRMAR_OPERACAO: 'Deseja confirmar a operação?',
            },
        }
    }
};

describe('SidenavComponent', () => {
    let component: SidenavComponent;
    let fixture: ComponentFixture<SidenavComponent>;
    const oldResetTestingModule = TestBed.resetTestingModule;

    beforeAll(done => (async () => {

        TestBed.configureTestingModule({
            declarations: [
                SidenavComponent,
                MockMzTooltipDirective,
                AppMockComponent
            ],
            imports: [
                RouterTestingModule.withRoutes(routes),
            ],
            providers: [
                { provide: GrupoSegurancaService, useValue: mocks.services.grupoSegurancaService },
                { provide: ArmazenamentoGlobalService, useValue: mocks.services.storage },
                { provide: FavoritoService, useValue: mocks.services.favoritoService },
                { provide: WorkflowService, useValue: mocks.services.workflowService },
                { provide: LoaderService, useValue: mocks.services.loader }
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
        const returned = engine.createSubscribeMock(
            mocks.constants.listaItens,
            true
        );
        mocks.services.grupoSegurancaService.setObeterGrupoSegurancaReturn(returned);

        mocks.services.storage.setObterReturn([{ IndicadorMenu: 'ml' }]);

        fixture = TestBed.createComponent(SidenavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve ser criado', () => {
        expect(component).toBeTruthy();
    });

    describe('Ao clicar em hide ->', () => {
        it('Abre menu', () => {
            component.toggleCollapseMenu();
            expect(component.hide).toBeTruthy();
        });

        it('fecha menu', () => {
            component.hide = true;
            component.toggleCollapseMenu();
            expect(component.hide).toBeFalsy();
        });
    });

    describe('Ao verificar se é menu fixo ->', () => {
        it('caso seja fixo deve setar variavel menuFixo como true', () => {
            component['route'].snapshot.data = { menuFixo: true };

            component.verificarMenuFixo();
            expect(component.menuFixo).toBeTruthy();
        });

        it('caso seja fixo deve abrir menu', () => {
            component['route'].snapshot.data = { menuFixo: true };

            component.verificarMenuFixo();
            expect(component.sideMenuWidth).toBe('255px');
        });
    });

    describe('Ao buscar menu na API ->', () => {
        it('caso haja menus do tipo ML deve preencher lista de menus', () => {

            component.buscaMenuNaApi();

            expect(component.listaMenus).toEqual([{ IdTabela: 1, IndicadorMenu: 'ml' }, { IdTabela: 2, IndicadorMenu: 'ml' }]);
        });
    });

    describe('Ao verificaFavorito ->', () => {
        it('true', () => {
            component.buscaMenuNaApi = jasmine.createSpy('criarMenu');
            mocks.services.favoritoService.setApagarReturn(engine.createSubscribeMock([], true));
            component.verificaFavorito(1, true);
            expect(component.buscaMenuNaApi).toHaveBeenCalled();
        });
    });

    describe('Ao navegar', () => {
        it('deve verificar se a rota foi chamada', () => {
            component['router'].navigateByUrl = jasmine.createSpy('navigateByUrl');
            mocks.services.workflowService.setObterRotaPorIdWorkflowReturn(engine.createSubscribeMock('', true));
            component.navegar(1);
            expect(component['router'].navigateByUrl).toHaveBeenCalled();
        });
    });

});

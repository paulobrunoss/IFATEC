import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingEngine } from '@testing/testing-engine/testing-engine';
import { MainComponent } from '@shared/layouts/main/main.component';
import { InternationalizationService } from '@core/internationalization/internationalization.service';
import { WorkflowService } from '@shared/api/menu/workflow.service';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '@testing/app-routing.module.mock';
import { HeaderComponent } from '@shared/header/header.component';
import { MockComponent } from 'ng-mocks';
import { NavbarNewComponent } from '@shared/navbar-new/navbar-new.component';
import { SidenavComponent } from '@shared/sidenav/sidenav.component';
import { AppMockComponent } from '@testing/component.mock';

const engine = new TestingEngine(jasmine);
const mocks = {
    services: {
        internationalization: engine.createServiceMockInstance(InternationalizationService),
        workflowService: engine.createServiceMockInstance(WorkflowService)
    }
};

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;


    const oldResetTestingModule = TestBed.resetTestingModule;

    beforeAll(done => (async () => {

        TestBed.configureTestingModule({
            declarations: [
                MainComponent,
                MockComponent(HeaderComponent),
                MockComponent(NavbarNewComponent),
                MockComponent(SidenavComponent),
                AppMockComponent

            ],
            imports: [
                RouterTestingModule.withRoutes(routes),
            ],
            providers: [
                { provide: InternationalizationService, useValue: mocks.services.internationalization },
                { provide: WorkflowService, useValue: mocks.services.workflowService },
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
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});


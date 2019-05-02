import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { Component } from '@angular/core';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  const oldResetTestingModule = TestBed.resetTestingModule;
  beforeAll(done =>
    (async () => {
      TestBed.configureTestingModule({
        declarations: [LoaderComponent]
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
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deverá ser criado.', () => {
    expect(component).toBeTruthy();
  });

  describe('ao exibir loader', () => {
    it('deverá exibir o loader.', () => {
      component.exibirLoader('');
      expect(component.loaders.length).toBeGreaterThan(0);
    });
  });

  describe('ao fechar loader', () => {
    it('deverá sumir com o loader.', () => {
      component.exibirLoader('');
      component.fecharLoader('');
      expect(component.loaders.length).toBe(0);
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarservicoPage } from './criarservico.page';

describe('CriarservicoPage', () => {
  let component: CriarservicoPage;
  let fixture: ComponentFixture<CriarservicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarservicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

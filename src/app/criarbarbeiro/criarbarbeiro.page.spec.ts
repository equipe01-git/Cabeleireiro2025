import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarbarbeiroPage } from './criarbarbeiro.page';

describe('CriarPage', () => {
  let component: CriarbarbeiroPage;
  let fixture: ComponentFixture<CriarbarbeiroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarbarbeiroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

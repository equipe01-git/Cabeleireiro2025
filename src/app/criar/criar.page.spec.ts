import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarPage } from './criar.page';

describe('CriarPage', () => {
  let component: CriarPage;
  let fixture: ComponentFixture<CriarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

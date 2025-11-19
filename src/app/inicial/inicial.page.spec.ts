import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicialPage } from './inicial.page';

describe('InicialPage', () => {
  let component: InicialPage;
  let fixture: ComponentFixture<InicialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

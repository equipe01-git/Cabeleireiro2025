import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarbeiroPage } from './barbeiro.page';

describe('BarbeiroPage', () => {
  let component: BarbeiroPage;
  let fixture: ComponentFixture<BarbeiroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BarbeiroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProvedorPage } from './provedor.page';

describe('ProvedorPage', () => {
  let component: ProvedorPage;
  let fixture: ComponentFixture<ProvedorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

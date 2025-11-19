import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntrarbarbeiroPage } from './entrarbarbeiro.page';

describe('EntrarPage', () => {
  let component: EntrarbarbeiroPage;
  let fixture: ComponentFixture<EntrarbarbeiroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrarbarbeiroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

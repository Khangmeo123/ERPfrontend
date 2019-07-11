import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSupplierGroupComponent } from './detail-supplier-group.component';

describe('DetailSupplierGroupComponent', () => {
  let component: DetailSupplierGroupComponent;
  let fixture: ComponentFixture<DetailSupplierGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSupplierGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSupplierGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

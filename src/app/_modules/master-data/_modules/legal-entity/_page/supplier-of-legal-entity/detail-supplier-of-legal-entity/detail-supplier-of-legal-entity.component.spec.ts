import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSupplierOfLegalEntityComponent } from './detail-supplier-of-legal-entity.component';

describe('DetailSupplierOfLegalEntityComponent', () => {
  let component: DetailSupplierOfLegalEntityComponent;
  let fixture: ComponentFixture<DetailSupplierOfLegalEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSupplierOfLegalEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSupplierOfLegalEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

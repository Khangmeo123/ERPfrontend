import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialConsumptionTaxComponent } from './special-consumption-tax.component';

describe('SpecialConsumptionTaxComponent', () => {
  let component: SpecialConsumptionTaxComponent;
  let fixture: ComponentFixture<SpecialConsumptionTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialConsumptionTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialConsumptionTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueAddedTaxComponent } from './value-added-tax.component';

describe('ValueAddedTaxComponent', () => {
  let component: ValueAddedTaxComponent;
  let fixture: ComponentFixture<ValueAddedTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValueAddedTaxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueAddedTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

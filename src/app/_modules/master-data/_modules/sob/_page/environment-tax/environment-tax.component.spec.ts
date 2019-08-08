import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentTaxComponent } from './environment-tax.component';

describe('EnvironmentTaxComponent', () => {
  let component: EnvironmentTaxComponent;
  let fixture: ComponentFixture<EnvironmentTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnvironmentTaxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

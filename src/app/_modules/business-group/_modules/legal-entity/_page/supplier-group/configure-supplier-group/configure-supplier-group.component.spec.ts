import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureSupplierGroupComponent } from './configure-supplier-group.component';

describe('ConfigureSupplierGroupComponent', () => {
  let component: ConfigureSupplierGroupComponent;
  let fixture: ComponentFixture<ConfigureSupplierGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureSupplierGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureSupplierGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

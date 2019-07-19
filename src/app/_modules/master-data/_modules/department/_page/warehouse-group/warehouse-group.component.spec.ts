import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseGroupComponent } from './warehouse-group.component';

describe('WarehouseGroupComponent', () => {
  let component: WarehouseGroupComponent;
  let fixture: ComponentFixture<WarehouseGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

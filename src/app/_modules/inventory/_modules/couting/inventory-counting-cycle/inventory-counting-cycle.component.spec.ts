import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCountingCycleComponent } from './inventory-counting-cycle.component';

describe('InventoryCountingCycleComponent', () => {
  let component: InventoryCountingCycleComponent;
  let fixture: ComponentFixture<InventoryCountingCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryCountingCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCountingCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

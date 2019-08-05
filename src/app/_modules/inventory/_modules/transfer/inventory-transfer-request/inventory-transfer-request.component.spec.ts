import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTransferRequestComponent } from './inventory-transfer-request.component';

describe('InventoryTransferRequestComponent', () => {
  let component: InventoryTransferRequestComponent;
  let fixture: ComponentFixture<InventoryTransferRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryTransferRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTransferRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

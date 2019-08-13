import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTransferRequestDetailComponent } from './inventory-transfer-request-detail.component';

describe('GoodsIssueDetailComponent', () => {
  let component: InventoryTransferRequestDetailComponent;
  let fixture: ComponentFixture<InventoryTransferRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryTransferRequestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTransferRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

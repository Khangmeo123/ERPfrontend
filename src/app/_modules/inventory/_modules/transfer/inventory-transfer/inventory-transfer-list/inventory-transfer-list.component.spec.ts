import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTransferListComponent } from './inventory-transfer-list.component';

describe('GoodsIssueListComponent', () => {
  let component: InventoryTransferListComponent;
  let fixture: ComponentFixture<InventoryTransferListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryTransferListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTransferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

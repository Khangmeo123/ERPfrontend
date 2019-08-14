import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCountingListComponent } from './inventory-counting-list.component';

describe('GoodsIssueListComponent', () => {
  let component: InventoryCountingListComponent;
  let fixture: ComponentFixture<InventoryCountingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryCountingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCountingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

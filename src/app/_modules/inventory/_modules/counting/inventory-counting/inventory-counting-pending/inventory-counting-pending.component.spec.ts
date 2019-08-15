import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCountingDetailComponent } from './inventory-counting-detail.component';

describe('GoodsIssueDetailComponent', () => {
  let component: InventoryCountingDetailComponent;
  let fixture: ComponentFixture<InventoryCountingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryCountingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCountingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

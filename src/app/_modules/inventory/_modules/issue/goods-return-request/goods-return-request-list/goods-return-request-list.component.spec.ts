import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReturnRequestListComponent } from './goods-return-request-list.component';

describe('GoodsIssueListComponent', () => {
  let component: GoodsReturnRequestListComponent;
  let fixture: ComponentFixture<GoodsReturnRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsReturnRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReturnRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

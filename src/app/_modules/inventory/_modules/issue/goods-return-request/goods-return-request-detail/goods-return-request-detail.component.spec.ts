import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReturnRequestDetailComponent } from './goods-return-request-detail.component';

describe('GoodsReturnApproveComponent', () => {
  let component: GoodsReturnRequestDetailComponent;
  let fixture: ComponentFixture<GoodsReturnRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsReturnRequestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReturnRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

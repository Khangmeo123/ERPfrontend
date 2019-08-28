import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReturnDetailComponent } from './goods-return-detail.component';

describe('GoodsReturnApproveComponent', () => {
  let component: GoodsReturnDetailComponent;
  let fixture: ComponentFixture<GoodsReturnDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsReturnDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReturnDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

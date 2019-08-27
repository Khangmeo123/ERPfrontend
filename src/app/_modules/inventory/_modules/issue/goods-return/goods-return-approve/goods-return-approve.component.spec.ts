import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReturnApproveComponent } from './goods-return-approve.component';

describe('GoodsReturnApproveComponent', () => {
  let component: GoodsReturnApproveComponent;
  let fixture: ComponentFixture<GoodsReturnApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsReturnApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReturnApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

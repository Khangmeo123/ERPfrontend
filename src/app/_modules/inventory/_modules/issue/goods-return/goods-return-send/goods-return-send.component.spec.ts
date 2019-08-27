import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReturnSendComponent } from './goods-return-send.component';

describe('GoodsReturnApproveComponent', () => {
  let component: GoodsReturnSendComponent;
  let fixture: ComponentFixture<GoodsReturnSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsReturnSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReturnSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

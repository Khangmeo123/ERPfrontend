import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReturnRequestComponent } from './goods-return-request.component';

describe('GoodsReturnRequestComponent', () => {
  let component: GoodsReturnRequestComponent;
  let fixture: ComponentFixture<GoodsReturnRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsReturnRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReturnRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

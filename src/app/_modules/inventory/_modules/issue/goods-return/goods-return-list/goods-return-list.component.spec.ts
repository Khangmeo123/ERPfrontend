import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReturnListComponent } from './goods-return-list.component';

describe('GoodsIssueListComponent', () => {
  let component: GoodsReturnListComponent;
  let fixture: ComponentFixture<GoodsReturnListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsReturnListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReturnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

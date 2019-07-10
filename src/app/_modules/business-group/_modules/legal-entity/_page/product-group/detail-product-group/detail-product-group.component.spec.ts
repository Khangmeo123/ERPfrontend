import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductGroupComponent } from './detail-product-group.component';

describe('DetailProductGroupComponent', () => {
  let component: DetailProductGroupComponent;
  let fixture: ComponentFixture<DetailProductGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailProductGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProductGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

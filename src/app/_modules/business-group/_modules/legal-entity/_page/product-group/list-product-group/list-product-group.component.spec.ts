import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductGroupComponent } from './list-product-group.component';

describe('ListProductGroupComponent', () => {
  let component: ListProductGroupComponent;
  let fixture: ComponentFixture<ListProductGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

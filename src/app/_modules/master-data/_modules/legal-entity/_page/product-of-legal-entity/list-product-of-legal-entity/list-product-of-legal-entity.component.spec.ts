import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductOfLegalEntityComponent } from './list-product-of-legal-entity.component';

describe('ListProductOfLegalEntityComponent', () => {
  let component: ListProductOfLegalEntityComponent;
  let fixture: ComponentFixture<ListProductOfLegalEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductOfLegalEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductOfLegalEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

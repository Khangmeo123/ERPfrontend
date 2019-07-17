import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductOfLegalEntityComponent } from './detail-product-of-legal-entity.component';

describe('DetailProductOfLegalEntityComponent', () => {
  let component: DetailProductOfLegalEntityComponent;
  let fixture: ComponentFixture<DetailProductOfLegalEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailProductOfLegalEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProductOfLegalEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

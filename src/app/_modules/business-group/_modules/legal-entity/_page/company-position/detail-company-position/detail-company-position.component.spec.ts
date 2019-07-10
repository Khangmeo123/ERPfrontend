import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCompanyPositionComponent } from './detail-company-position.component';

describe('DetailCompanyPositionComponent', () => {
  let component: DetailCompanyPositionComponent;
  let fixture: ComponentFixture<DetailCompanyPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCompanyPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCompanyPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemOfLegalEntityComponent } from './detail-item-of-legal-entity.component';

describe('DetailItemOfLegalEntityComponent', () => {
  let component: DetailItemOfLegalEntityComponent;
  let fixture: ComponentFixture<DetailItemOfLegalEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailItemOfLegalEntityComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailItemOfLegalEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

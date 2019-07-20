import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemGroupComponent } from './detail-item-group.component';

describe('DetailItemGroupComponent', () => {
  let component: DetailItemGroupComponent;
  let fixture: ComponentFixture<DetailItemGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailItemGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailItemGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

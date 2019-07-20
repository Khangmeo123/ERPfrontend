import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemOfLegalEntityComponent } from './list-item-of-legal-entity.component';

describe('ListItemOfLegalEntityComponent', () => {
  let component: ListItemOfLegalEntityComponent;
  let fixture: ComponentFixture<ListItemOfLegalEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemOfLegalEntityComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemOfLegalEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

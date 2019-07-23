import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOfLegalEntityComponent } from './item-of-legal-entity.component';

describe('ItemOfLegalEntityComponent', () => {
  let component: ItemOfLegalEntityComponent;
  let fixture: ComponentFixture<ItemOfLegalEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemOfLegalEntityComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOfLegalEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

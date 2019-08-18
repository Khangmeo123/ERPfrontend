import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumListSelectComponent } from './enum-list-select.component';

describe('EnumListSelectComponent', () => {
  let component: EnumListSelectComponent;
  let fixture: ComponentFixture<EnumListSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumListSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumListSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropListSelectComponent } from './drop-list-select.component';

describe('DropListSelectComponent', () => {
  let component: DropListSelectComponent;
  let fixture: ComponentFixture<DropListSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropListSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropListSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

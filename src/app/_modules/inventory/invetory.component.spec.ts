import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvetoryComponent } from './invetory.component';

describe('InvetoryComponent', () => {
  let component: InvetoryComponent;
  let fixture: ComponentFixture<InvetoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvetoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvetoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

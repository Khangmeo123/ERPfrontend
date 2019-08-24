import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialDialogComponent } from './serial-dialog.component';

describe('SerialDialogComponent', () => {
  let component: SerialDialogComponent;
  let fixture: ComponentFixture<SerialDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerialDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialNumberDialogComponent } from './serial-number-dialog.component';

describe('SerialNumberDialogComponent', () => {
  let component: SerialNumberDialogComponent;
  let fixture: ComponentFixture<SerialNumberDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SerialNumberDialogComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerialNumberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

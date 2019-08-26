import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchDialogComponent } from './batch-dialog.component';

describe('BatchDialogComponent', () => {
  let component: BatchDialogComponent;
  let fixture: ComponentFixture<BatchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BatchDialogComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

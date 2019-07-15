import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobLevelComponent } from './job-level.component';

describe('JobLevelComponent', () => {
  let component: JobLevelComponent;
  let fixture: ComponentFixture<JobLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

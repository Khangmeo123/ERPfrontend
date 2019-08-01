import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOrganizationComponent } from './project-organization.component';

describe('ProjectComponent', () => {
  let component: ProjectOrganizationComponent;
  let fixture: ComponentFixture<ProjectOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectOrganizationComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

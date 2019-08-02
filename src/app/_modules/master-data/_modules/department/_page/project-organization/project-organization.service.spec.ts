import { TestBed } from '@angular/core/testing';

import { ProjectOrganizationService } from './project-organization.service';

describe('ProjectOrganizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectOrganizationService = TestBed.get(ProjectOrganizationService);
    expect(service).toBeTruthy();
  });
});

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Repository } from '../../../../../../_helpers/repository';
import { environment } from '../../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeSearchEntity } from '../../../../_backend/employee/employee.searchentity';
import { EmployeeEntity } from '../../../../_backend/employee/employee.entity';
import { Entities } from '../../../../../../_helpers/entity';
import { ProjectOrganizationSearchEntity } from '../../../../_backend/project-organization/project-organization.search-entity';
import { ProjectOrganizationEntity } from '../../../../_backend/project-organization/project-organization.entity';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectOrganizationRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/department/project-organization';
  }

  getList(projectOrganizationSearchEntity: ProjectOrganizationSearchEntity): Observable<ProjectOrganizationEntity[]> {
    return this.http.post<ProjectOrganizationEntity[]>(
      `${this.apiUrl}/list-project`,
      projectOrganizationSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<ProjectOrganizationEntity[]>) => {
          return response.body.map((projectOrganization) => new ProjectOrganizationEntity(projectOrganization));
        }),
      );
  }

  count(projectOrganizationSearchEntity: ProjectOrganizationSearchEntity): Observable<number> {
    return this.http.post<number>(
      `${this.apiUrl}/count-project`,
      projectOrganizationSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<number>) => {
          return response.body;
        }),
      );
  }

  getById(id: string): Promise<ProjectOrganizationEntity> {
    return new Promise((resolve, reject) => {
      this.http.post<ProjectOrganizationEntity>(
        `${this.apiUrl}/get-project`,
        {
          id,
        },
        {
          observe: 'response',
          headers: this.getHeader(),
        },
      )
        .subscribe(
          (response: HttpResponse<ProjectOrganizationEntity>) => resolve(response.body),
          (error: Error) => reject(error),
        );
    });
  }

  create(projectOrganizationEntity: ProjectOrganizationEntity): Observable<ProjectOrganizationEntity> {
    return this.http.post<ProjectOrganizationEntity>(
      `${this.apiUrl}/create-project`,
      projectOrganizationEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<ProjectOrganizationEntity>) => response.body),
      );
  }

  update(projectOrganizationEntity: ProjectOrganizationEntity): Observable<ProjectOrganizationEntity> {
    return this.http.post<ProjectOrganizationEntity>(
      `${this.apiUrl}/update-project`,
      projectOrganizationEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<ProjectOrganizationEntity>) => response.body),
      );
  }

  getEmployeeList(employeeSearchEntity: EmployeeSearchEntity): Observable<EmployeeEntity[]> {
    return this.http.post<EmployeeEntity[]>(
      `${this.apiUrl}/list-employee-detail`,
      employeeSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<EmployeeEntity[]>) => {
          return response.body.map((projectOrganization) => new EmployeeEntity(projectOrganization));
        }),
      );
  }

  searchEmployee(employeeSearchEntity: EmployeeSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(
      `${this.apiUrl}/drop-list-employee-detail`,
      employeeSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<Entities>) => {
          return {
            ids: response.body.ids.map((entity) => new EmployeeEntity(entity)),
            exceptIds: response.body.exceptIds.map((entity) => new EmployeeEntity(entity)),
          };
        }),
      );
  }

  countEmployee(employeeSearchEntity: EmployeeSearchEntity): Observable<number> {
    return this.http.post<number>(
      `${this.apiUrl}/count-employee-detail`,
      employeeSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<number>) => {
          return response.body;
        }),
      );
  }

  removeEmployeeFromOrganization(employeeId: string, projectOrganizationId: string): Promise<EmployeeEntity> {
    return new Promise((resolve, reject) => {
      return this.http.post<EmployeeEntity>(
        `${this.apiUrl}/delete-employee-detail`,
        {
          employeeId,
          projectOrganizationId,
        },
        {
          observe: 'response',
          headers: this.getHeader(),
        },
      )
        .subscribe(
          (response: HttpResponse<EmployeeEntity>) => resolve(response.body),
          (error: Error) => reject(error),
        );
    });
  }

  addEmployeeToDepartment(employeeIds: string[], projectOrganizationId: string, employeeSearchEntity: EmployeeSearchEntity): Promise<void> {
    const payload = employeeIds.map((id: string) => ({
      employeeId: id,
      projectOrganizationId,
    }));
    return new Promise((resolve, reject) => {
      return this.http.post<EmployeeEntity>(
        `${this.apiUrl}/add-employee-detail`,
        payload,
        {
          observe: 'response',
          headers: this.getHeader(),
        },
      )
        .subscribe(
          (response: HttpResponse<null>) => resolve(),
          (error: Error) => reject(error),
        );
    });
  }
}

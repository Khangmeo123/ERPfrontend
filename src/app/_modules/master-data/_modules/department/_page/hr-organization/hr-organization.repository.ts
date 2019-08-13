import {HttpClient, HttpResponse} from '@angular/common/http';
import {Repository} from '../../../../../../_helpers/repository';
import {environment} from '../../../../../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HrOrganizationSearchEntity} from '../../../../_backend/hr-organization/hr-organization.search-entity';
import {HrOrganizationEntity} from '../../../../_backend/hr-organization/hr-organization.entity';
import {EmployeeSearchEntity} from '../../../../_backend/employee/employee.searchentity';
import {EmployeeEntity} from '../../../../_backend/employee/employee.entity';
import {Entities} from '../../../../../../_helpers/entity';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HrOrganizationRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/department/hr-organization';
  }

  getList(hrOrganizationSearchEntity: HrOrganizationSearchEntity): Observable<HrOrganizationEntity[]> {
    return this.http.post<HrOrganizationEntity[]>(
      `${this.apiUrl}/list-department`,
      hrOrganizationSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<HrOrganizationEntity[]>) => {
          return response.body.map((hrOrganization) => new HrOrganizationEntity(hrOrganization));
        }),
      );
  }

  count(hrOrganizationSearchEntity: HrOrganizationSearchEntity): Observable<number> {
    return this.http.post<number>(
      `${this.apiUrl}/count-department`,
      hrOrganizationSearchEntity,
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

  getById(id: string): Promise<HrOrganizationEntity> {
    return new Promise((resolve, reject) => {
      this.http.post<HrOrganizationEntity>(
        `${this.apiUrl}/get-department`,
        {
          id,
        },
        {
          observe: 'response',
          headers: this.getHeader(),
        },
      )
        .subscribe(
          (response: HttpResponse<HrOrganizationEntity>) => resolve(response.body),
          (error: Error) => reject(error),
        );
    });
  }

  create(hrOrganizationEntity: HrOrganizationEntity): Observable<HrOrganizationEntity> {
    return this.http.post<HrOrganizationEntity>(
      `${this.apiUrl}/create-department`,
      hrOrganizationEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<HrOrganizationEntity>) => response.body),
      );
  }

  update(hrOrganizationEntity: HrOrganizationEntity): Observable<HrOrganizationEntity> {
    return this.http.post<HrOrganizationEntity>(
      `${this.apiUrl}/update-department`,
      hrOrganizationEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<HrOrganizationEntity>) => response.body),
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
          return response.body.map((hrOrganization) => new EmployeeEntity(hrOrganization));
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

  removeEmployeeFromOrganization(employeeDetailId: string, hrOrganizationId: string): Promise<EmployeeEntity> {
    return new Promise((resolve, reject) => {
      return this.http.post<EmployeeEntity>(
        `${this.apiUrl}/delete-employee-detail`,
        {
          employeeDetailId,
          hrOrganizationId,
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

  addEmployeeToDepartment(
    employeeDetailIds: string[],
    hrOrganizationId: string,
    employeeSearchEntity: EmployeeSearchEntity,
  ): Promise<void> {
    const payload = employeeDetailIds.map((employeeDetailId: string) => ({
      employeeDetailId,
      hrOrganizationId,
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Repository } from '../../../../../../_repositories/repository';
import { environment } from '../../../../../../../environments/environment';
import { DepartmentSearchEntity } from '../../../../_backend/department/department.search-entity';
import { DepartmentEntity } from '../../../../_backend/department/department.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LegalSearchEntity } from '../../../../_backend/legal/legal.searchentity';
import { DivisionSearchEntity } from '../../../../_backend/division/division.searchentity';
import { Entities } from '../../../../../../_helpers/entity';

@Injectable({
  providedIn: 'root',
})
export class DepartmentRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/department';
  }

  getList(departmentSearchEntity: DepartmentSearchEntity): Observable<DepartmentEntity[]> {
    return this.http.post<DepartmentEntity[]>(
      `${this.apiUrl}/hr-organization/list-department`,
      departmentSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<DepartmentEntity[]>) => {
          return response.body.map((department) => new DepartmentEntity(department));
        }),
      );
  }

  count(departmentSearchEntity: DepartmentSearchEntity): Observable<number> {
    return this.http.post<number>(
      `${this.apiUrl}/hr-organization/count-department`,
      departmentSearchEntity,
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

  getLegalEntityList(legalSearchEntity: LegalSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(
      `${this.apiUrl}/drop-list-legal-entity`,
      legalSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<Entities>) => response.body),
      );
  }

  getDivisionList(divisionSearchEntity: DivisionSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(
      `${this.apiUrl}/drop-list-division`,
      divisionSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<Entities>) => response.body),
      );
  }

  create(departmentEntity: DepartmentEntity): Observable<DepartmentEntity> {
    return this.http.post<DepartmentEntity>(
      `${this.apiUrl}/hr-organization/create-department`,
      departmentEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<DepartmentEntity>) => response.body),
      );
  }

  update(departmentEntity: DepartmentEntity): Observable<DepartmentEntity> {
    return this.http.post<DepartmentEntity>(
      `${this.apiUrl}/hr-organization/update-department`,
      departmentEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<DepartmentEntity>) => response.body),
      );
  }
}

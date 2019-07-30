import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Repository } from '../../../../../../_helpers/repository';
import { environment } from '../../../../../../../environments/environment';
import { DepartmentSearchEntity } from '../../../../_backend/department/department.search-entity';
import { DepartmentEntity } from '../../../../_backend/department/department.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LegalSearchEntity } from '../../../../_backend/legal/legal.searchentity';
import { LegalEntity } from '../../../../_backend/legal/legal.entity';
import { DivisionEntity } from '../../../../_backend/division/divisionl.entity';
import { DivisionSearchEntity } from '../../../../_backend/division/division.searchentity';

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

  getLegalEntityList(legalSearchEntity: LegalSearchEntity): Observable<LegalEntity[]> {
    return this.http.post<LegalEntity[]>(
      `${this.apiUrl}/list-legal-entity`,
      legalSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<LegalEntity[]>) => {
          return response.body.map((legalEntity) => new LegalEntity(legalEntity));
        }),
      );
  }

  getDivisionList(divisionSearchEntity: DivisionSearchEntity): Observable<DivisionEntity[]> {
    return this.http.post<DivisionEntity[]>(
      `${this.apiUrl}/list-division`,
      divisionSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<DivisionEntity[]>) => {
          return response.body.map((division) => new DivisionEntity(division));
        }),
      );
  }
}

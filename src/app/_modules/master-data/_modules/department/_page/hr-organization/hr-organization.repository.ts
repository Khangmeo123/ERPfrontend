import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Repository } from '../../../../../../_helpers/repository';
import { environment } from '../../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HrOrganizationSearchEntity } from '../../../../_backend/hr-organization/hr-organization.search-entity';
import { HrOrganizationEntity } from '../../../../_backend/hr-organization/hr-organization.entity';

@Injectable({
  providedIn: 'root',
})
export class HrOrganizationRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/hrOrganization';
  }

  getList(hrOrganizationSearchEntity: HrOrganizationSearchEntity): Observable<HrOrganizationEntity[]> {
    return this.http.post<HrOrganizationEntity[]>(
      `${this.apiUrl}/hr-organization/list-hrOrganization`,
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
      `${this.apiUrl}/hr-organization/count-hrOrganization`,
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

  create(hrOrganizationEntity: HrOrganizationEntity): Observable<HrOrganizationEntity> {
    return this.http.post<HrOrganizationEntity>(
      `${this.apiUrl}/hr-organization/create-hrOrganization`,
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
      `${this.apiUrl}/hr-organization/update-hrOrganization`,
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
}

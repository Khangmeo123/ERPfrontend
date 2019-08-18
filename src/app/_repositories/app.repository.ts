import { Repository } from '../_helpers/repository';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LegalEntity } from '../_modules/master-data/_backend/legal/legal.entity';

@Injectable({
  providedIn: 'root',
})
export class AppRepository extends Repository {
  constructor(http: HttpClient) {
    super(http);
  }

  getLegalEntityList(): Observable<LegalEntity[]> {
    return this.http.post<LegalEntity[]>(
      `${environment.apiUrlApps}list-legal-entity`,
      {},
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<LegalEntity[]>) => {
            return response.body.map((item) => new LegalEntity(item));
          },
        ),
      );
  }

  getLegalEntity(id: string): Observable<LegalEntity> {
    return this.http.post<LegalEntity>(
      `${environment.apiUrlApps}get-legal-entity`,
      {
        id,
      },
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<LegalEntity>) => response.body,
        ),
      );
  }
}

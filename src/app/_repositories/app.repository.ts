import { Repository } from '../_helpers/repository';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LegalSearchEntity } from '../_modules/master-data/_backend/legal/legal.searchentity';
import { Observable } from 'rxjs';
import { Entities } from '../_helpers/entity';
import { map } from 'rxjs/operators';
import { LegalEntity } from '../_modules/master-data/_backend/legal/legal.entity';

@Injectable({
  providedIn: 'root',
})
export class AppRepository extends Repository {
  constructor(http: HttpClient) {
    super(http);
  }

  getLegalEntityList(legalSearchEntity: LegalSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(
      `${environment.apiUrlApps}drop-list-legal-entity`,
      legalSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<Entities>) => {
            const entities: Entities = new Entities();
            entities.ids = response.body.ids.map((item) => new LegalEntity(item));
            entities.exceptIds = response.body.exceptIds.map((item) => new LegalEntity(item));
            return entities;
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

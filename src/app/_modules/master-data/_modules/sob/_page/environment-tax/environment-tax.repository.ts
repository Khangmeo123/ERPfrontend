import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { Entities } from '../../../../../../_helpers/entity';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { UomSearchEntity } from '../../../../_backend/uom/uom.searchentity';
import { EnvironmentTaxEntity } from '../../../../_backend/environment-tax/environment-tax.entity';
import { EnvironmentTaxSearchEntity } from '../../../../_backend/environment-tax/environment-tax.search-entity';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentTaxRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/set-of-book/environment-tax';
  }

  getList(environmentTaxSearchEntity: EnvironmentTaxSearchEntity): Observable<EnvironmentTaxEntity[]> {
    return this.http.post<EnvironmentTaxEntity[]>(this.apiUrl + '/list', JSON.stringify(environmentTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new EnvironmentTaxEntity(item);
        });
      }),
    );
  }

  count(environmentTaxSearchEntity: EnvironmentTaxSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(environmentTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getSobList(sobSearchEntity: SobSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(this.apiUrl + '/drop-list-set-of-book', JSON.stringify(sobSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        const {
          ids,
          exceptIds,
        } = r.body;
        return {
          ids: ids.map((item) => new SobEntity(item)),
          exceptIds: exceptIds.map((item) => new SobEntity(item)),
        };
      }),
    );
  }

  getUnitOfMeasureList(uomSearchEntity: UomSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(this.apiUrl + '/drop-list-unit-of-measure', JSON.stringify(uomSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        const {
          ids,
          exceptIds,
        } = r.body;
        return {
          ids: ids.map((item) => new SobEntity(item)),
          exceptIds: exceptIds.map((item) => new SobEntity(item)),
        };
      }),
    );
  }

  getId(environmentTaxId: string): Observable<EnvironmentTaxEntity> {
    return this.http.post<EnvironmentTaxEntity>(this.apiUrl + '/get', JSON.stringify({Id: environmentTaxId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new EnvironmentTaxEntity(r.body);
      }),
    );
  }


  add(environmentTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(environmentTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(environmentTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(environmentTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  deactivate(environmentTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/deactivate', JSON.stringify(environmentTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  public getParentTaxList(parentTaxSearchEntity: EnvironmentTaxSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(
      `${this.apiUrl}/drop-list-parent-tax`,
      parentTaxSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<Entities>) => {
          const entities: Entities = new Entities();
          entities.ids = response.body.ids.map((item) => new EnvironmentTaxEntity(item));
          entities.exceptIds = response.body.exceptIds.map((item) => new EnvironmentTaxEntity(item));
          return entities;
        }),
      );
  }

  public disable(taxEntity: EnvironmentTaxEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<EnvironmentTaxEntity>(
        `${this.apiUrl}/disable`,
        taxEntity,
        {
          observe: 'response',
          headers: this.getHeader(),
        },
      )
        .subscribe(
          () => resolve(),
          (error) => reject(error),
        );
    });
  }

  public enable(taxEntity: EnvironmentTaxEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<EnvironmentTaxEntity>(
        `${this.apiUrl}/enable`,
        taxEntity,
        {
          observe: 'response',
          headers: this.getHeader(),
        },
      )
        .subscribe(
          () => resolve(),
          (error) => reject(error),
        );
    });
  }
}

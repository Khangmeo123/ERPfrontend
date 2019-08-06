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
import { ValueAddedTaxEntity } from '../../../../_backend/value-added-tax/value-added-tax.entity';
import { ValueAddedTaxSearchEntity } from '../../../../_backend/value-added-tax/value-added-tax.search-entity';

@Injectable({
  providedIn: 'root',
})
export class ValueAddedTaxRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/set-of-book/value-added-tax';
  }

  getList(valueAddedTaxSearchEntity: ValueAddedTaxSearchEntity): Observable<ValueAddedTaxEntity[]> {
    return this.http.post<ValueAddedTaxEntity[]>(this.apiUrl + '/list', JSON.stringify(valueAddedTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new ValueAddedTaxEntity(item);
        });
      }),
    );
  }

  count(valueAddedTaxSearchEntity: ValueAddedTaxSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(valueAddedTaxSearchEntity),
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

  getId(valueAddedTaxId: string): Observable<ValueAddedTaxEntity> {
    return this.http.post<ValueAddedTaxEntity>(this.apiUrl + '/get', JSON.stringify({Id: valueAddedTaxId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new ValueAddedTaxEntity(r.body);
      }),
    );
  }


  add(valueAddedTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(valueAddedTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(valueAddedTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(valueAddedTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  deactivate(valueAddedTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/deactivate', JSON.stringify(valueAddedTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  public getParentTaxList(parentTaxSearchEntity: ValueAddedTaxSearchEntity): Observable<Entities> {
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
          entities.ids = response.body.ids.map((item) => new ValueAddedTaxEntity(item));
          entities.exceptIds = response.body.exceptIds.map((item) => new ValueAddedTaxEntity(item));
          return entities;
        }),
      );
  }

  public disable(taxEntity: ValueAddedTaxEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<ValueAddedTaxEntity>(
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

  public enable(taxEntity: ValueAddedTaxEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<ValueAddedTaxEntity>(
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

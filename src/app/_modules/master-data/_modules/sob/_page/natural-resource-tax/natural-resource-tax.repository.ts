import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_repositories/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { Entities } from '../../../../../../_helpers/entity';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { UomSearchEntity } from '../../../../_backend/uom/uom.searchentity';
import { NaturalResourceTaxEntity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.entity';
import { NaturalResourceTaxSearchEntity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.search-entity';

@Injectable({
  providedIn: 'root',
})
export class NaturalResourceTaxRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/set-of-book/natural-resource-tax';
  }

  getList(naturalResourceTaxSearchEntity: NaturalResourceTaxSearchEntity): Observable<NaturalResourceTaxEntity[]> {
    return this.http.post<NaturalResourceTaxEntity[]>(this.apiUrl + '/list', JSON.stringify(naturalResourceTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new NaturalResourceTaxEntity(item);
        });
      }),
    );
  }

  count(naturalResourceTaxSearchEntity: NaturalResourceTaxSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(naturalResourceTaxSearchEntity),
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

  getId(naturalResourceTaxId: string): Observable<NaturalResourceTaxEntity> {
    return this.http.post<NaturalResourceTaxEntity>(this.apiUrl + '/get', JSON.stringify({Id: naturalResourceTaxId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new NaturalResourceTaxEntity(r.body);
      }),
    );
  }


  add(naturalResourceTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(naturalResourceTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(naturalResourceTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(naturalResourceTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  deactivate(naturalResourceTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/deactivate', JSON.stringify(naturalResourceTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  public getParentTaxList(parentTaxSearchEntity: NaturalResourceTaxSearchEntity): Observable<Entities> {
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
          entities.ids = response.body.ids.map((item) => new NaturalResourceTaxEntity(item));
          entities.exceptIds = response.body.exceptIds.map((item) => new NaturalResourceTaxEntity(item));
          return entities;
        }),
      );
  }

  public disable(taxEntity: NaturalResourceTaxEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<NaturalResourceTaxEntity>(
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

  public enable(taxEntity: NaturalResourceTaxEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<NaturalResourceTaxEntity>(
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

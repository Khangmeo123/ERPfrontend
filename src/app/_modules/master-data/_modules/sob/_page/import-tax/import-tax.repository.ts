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
import { ImportTaxEntity } from '../../../../_backend/import-tax/import-tax.entity';
import { ImportTaxSearchEntity } from '../../../../_backend/import-tax/import-tax.search-entity';

@Injectable({
  providedIn: 'root',
})
export class ImportTaxRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/set-of-book/import-tax';
  }

  getList(importTaxSearchEntity: ImportTaxSearchEntity): Observable<ImportTaxEntity[]> {
    return this.http.post<ImportTaxEntity[]>(this.apiUrl + '/list', JSON.stringify(importTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new ImportTaxEntity(item);
        });
      }),
    );
  }

  count(importTaxSearchEntity: ImportTaxSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(importTaxSearchEntity),
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

  getId(importTaxId: string): Observable<ImportTaxEntity> {
    return this.http.post<ImportTaxEntity>(this.apiUrl + '/get', JSON.stringify({Id: importTaxId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new ImportTaxEntity(r.body);
      }),
    );
  }


  add(importTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(importTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(importTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(importTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  deactivate(importTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/deactivate', JSON.stringify(importTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  public getParentTaxList(parentTaxSearchEntity: ImportTaxSearchEntity): Observable<Entities> {
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
          entities.ids = response.body.ids.map((item) => new ImportTaxEntity(item));
          entities.exceptIds = response.body.exceptIds.map((item) => new ImportTaxEntity(item));
          return entities;
        }),
      );
  }

  public disable(taxEntity: ImportTaxEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<ImportTaxEntity>(
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

  public enable(taxEntity: ImportTaxEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<ImportTaxEntity>(
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

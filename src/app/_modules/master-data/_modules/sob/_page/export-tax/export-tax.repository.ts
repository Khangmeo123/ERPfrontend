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
import { ExportTaxEntity } from '../../../../_backend/export-tax/export-tax.entity';
import { ExportTaxSearchEntity } from '../../../../_backend/export-tax/export-tax.search-entity';

@Injectable({
  providedIn: 'root',
})
export class ExportTaxRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/set-of-book/export-tax';
  }

  getList(exportTaxSearchEntity: ExportTaxSearchEntity): Observable<ExportTaxEntity[]> {
    return this.http.post<ExportTaxEntity[]>(this.apiUrl + '/list', JSON.stringify(exportTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new ExportTaxEntity(item);
        });
      }),
    );
  }

  count(exportTaxSearchEntity: ExportTaxSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(exportTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getSobList(sobSearchEntity: SobSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(this.apiUrl + '/list-set-of-book', JSON.stringify(sobSearchEntity),
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
    return this.http.post<Entities>(this.apiUrl + '/list-unit-of-measure', JSON.stringify(uomSearchEntity),
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

  getId(exportTaxId: string): Observable<ExportTaxEntity> {
    return this.http.post<ExportTaxEntity>(this.apiUrl + '/get', JSON.stringify({Id: exportTaxId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new ExportTaxEntity(r.body);
      }),
    );
  }


  add(exportTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(exportTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(exportTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(exportTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  deactivate(exportTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/deactivate', JSON.stringify(exportTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  public getParentTaxList(parentTaxSearchEntity: ExportTaxSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(
      `${this.apiUrl}/list-parent-tax`,
      parentTaxSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<Entities>) => {
          const entities: Entities = new Entities();
          entities.ids = response.body.ids.map((item) => new ExportTaxEntity(item));
          entities.exceptIds = response.body.exceptIds.map((item) => new ExportTaxEntity(item));
          return entities;
        }),
      );
  }

  public disable(taxEntity: ExportTaxEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<ExportTaxEntity>(
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

  public enable(taxEntity: ExportTaxEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<ExportTaxEntity>(
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

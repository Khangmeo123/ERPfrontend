import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { Entities } from '../../../../../../_helpers/entity';
import { FiscalYearEntity } from '../../../../_backend/fiscal-year/fiscal-year.entity';
import { FiscalYearSearchEntity } from '../../../../_backend/fiscal-year/fiscal-year.searchentity';

@Injectable({
  providedIn: 'root',
})
export class FiscalYearRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/set-of-book/fiscal-year';
  }

  getList(voucherSearchEntity: FiscalYearSearchEntity): Observable<FiscalYearEntity[]> {
    return this.http.post<FiscalYearEntity[]>(this.apiUrl + '/list', JSON.stringify(voucherSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new FiscalYearEntity(item);
        });
      }),
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

  getInventoryValuationMethodList(): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + '/list-inventory-valuation-method', '{}',
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body;
      }),
    );
  }

  count(voucherSearchEntity: FiscalYearSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(voucherSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getId(voucherId: string): Observable<FiscalYearEntity> {
    return this.http.post<FiscalYearEntity>(this.apiUrl + '/get', JSON.stringify({Id: voucherId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new FiscalYearEntity(r.body);
      }),
    );
  }


  add(voucherEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(voucherEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(voucherEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(voucherEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  delete(voucherEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(voucherEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}

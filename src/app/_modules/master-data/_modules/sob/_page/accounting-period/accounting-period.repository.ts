import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { Entities } from '../../../../../../_helpers/entity';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';
import { CoaEntity } from '../../../../_backend/coa/coa.entity';
import { AccountingPeriodSearchEntity } from '../../../../_backend/accounting-period/accounting-period.searchentity';
import { AccountingPeriodEntity } from '../../../../_backend/accounting-period/accounting-period.entity';
import { FiscalYearSearchEntity } from '../../../../_backend/fiscal-year/fiscal-year.searchentity';
import { FiscalYearEntity } from '../../../../_backend/fiscal-year/fiscal-year.entity';

@Injectable({
  providedIn: 'root',
})
export class AccountingPeriodRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/set-of-book/accounting-period';
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

  getPeriodTypeList() {
    return this.http.post<any[]>(this.apiUrl + '/enum-list-period-type', '',
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getFiscalYearList(fiscalYearSearchEntity: FiscalYearSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(
      this.apiUrl + '/drop-list-fiscal-year',
      JSON.stringify(fiscalYearSearchEntity),
      {
        observe: 'response',
        headers: this.getHeader(),
      })
      .pipe(
        map(
          (response: HttpResponse<Entities>) => {
            const entities: Entities = new Entities();
            entities.ids = response.body.ids.map((item) => new FiscalYearEntity(item));
            entities.exceptIds = response.body.exceptIds.map((item) => new FiscalYearEntity(item));
            return entities;
          },
        ),
      );
  }

  getCoaList(coaSearchEntity: CoaSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(this.apiUrl + '/drop-list-chart-of-account', JSON.stringify(coaSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        const {
          ids,
          exceptIds,
        } = r.body;
        return {
          ids: ids.map((item) => new CoaEntity(item)),
          exceptIds: exceptIds.map((item) => new CoaEntity(item)),
        };
      }),
    );
  }

  getList(accountingPeriodSearchEntity: AccountingPeriodSearchEntity): Observable<AccountingPeriodEntity[]> {
    return this.http.post<AccountingPeriodEntity[]>(this.apiUrl + '/list', JSON.stringify(accountingPeriodSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new AccountingPeriodEntity(item);
        });
      }),
    );
  }

  count(accountingPeriodSearchEntity: AccountingPeriodSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(accountingPeriodSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getId(accountingPeriodId: string): Observable<AccountingPeriodEntity> {
    return this.http.post<AccountingPeriodEntity>(this.apiUrl + '/get', JSON.stringify({Id: accountingPeriodId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new AccountingPeriodEntity(r.body);
      }),
    );
  }


  add(accountingPeriodEntity: AccountingPeriodEntity): Observable<boolean> {
    if (accountingPeriodEntity.periodTypeId) {
      return this.http.post<boolean>(this.apiUrl + '/bulk-create', JSON.stringify(accountingPeriodEntity),
        {observe: 'response', headers: this.getHeader()}).pipe(
        map(r => r.body),
      );
    } else {
      return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(accountingPeriodEntity),
        {observe: 'response', headers: this.getHeader()}).pipe(
        map(r => r.body),
      );
    }
  }

  update(accountingPeriodEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(accountingPeriodEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  deactivate(accountingPeriodEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/deactivate', JSON.stringify(accountingPeriodEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}
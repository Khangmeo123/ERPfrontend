import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AccountingPeriodSearchEntity } from '../../../../_backend/accounting-period/accounting-period.searchentity';
import { AccountingPeriodEntity } from '../../../../_backend/accounting-period/accounting-period.entity';

@Injectable({
  providedIn: 'root',
})
export class AccountingPeriodRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/setOfBook';
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

  add(accountingPeriodEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(accountingPeriodEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(accountingPeriodEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(accountingPeriodEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  delete(accountingPeriodEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(accountingPeriodEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { Entities } from '../../../../../../_helpers/entity';
import { BankAccountSearchEntity } from '../../../../_backend/bank-account/bank-account.searchentity';
import { BankAccountEntity } from '../../../../_backend/bank-account/bank-account.entity';
import { CoaEntity } from '../../../../_backend/coa/coa.entity';
import { ChartOfAccountSearchEntity } from '../../../../_backend/chart-of-account/chart-of-account.search-entity';

@Injectable({
  providedIn: 'root',
})
export class BankAccountRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/set-of-book/bank-account';
  }

  getCoaList(coaSearchEntity: ChartOfAccountSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(this.apiUrl + '/list-chart-of-account', JSON.stringify(coaSearchEntity),
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

  getList(bankAccountSearchEntity: BankAccountSearchEntity): Observable<BankAccountEntity[]> {
    return this.http.post<BankAccountEntity[]>(this.apiUrl + '/list', JSON.stringify(bankAccountSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new BankAccountEntity(item);
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

  count(bankAccountSearchEntity: BankAccountSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(bankAccountSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getId(bankAccountId: string): Observable<BankAccountEntity> {
    return this.http.post<BankAccountEntity>(this.apiUrl + '/get', JSON.stringify({Id: bankAccountId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new BankAccountEntity(r.body);
      }),
    );
  }


  add(bankAccountEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(bankAccountEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(bankAccountEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(bankAccountEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  delete(bankAccountEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(bankAccountEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}

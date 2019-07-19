import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CurrencyEntity } from '../../../../_backend/currency/currency.entity';
import { CurrencySearchEntity } from '../../../../_backend/currency/currency.searchentity';
import { BankAccountSearchEntity } from '../../../../_backend/bank-account/bank-account.searchentity';
import { BankAccountEntity } from '../../../../_backend/bank-account/bank-account.entity';

@Injectable({
  providedIn: 'root',
})
export class BankAccountRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/setOfBook';
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

  getCurrencyList(currencySearchEntity: CurrencySearchEntity): Observable<CurrencyEntity[]> {
    return this.http.post<CurrencyEntity[]>(this.apiUrl + '/currency/list', JSON.stringify(currencySearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new CurrencyEntity(item);
        });
      }),
    );
  }

  countCurrency(currencySearchEntity: CurrencySearchEntity) {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(currencySearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
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

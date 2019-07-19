import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { CurrencyEntity } from '../../../../_backend/currency/currency.entity';
import { CurrencySearchEntity } from '../../../../_backend/currency/currency.searchentity';

@Injectable({
  providedIn: 'root',
})
export class SobRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/setOfBook';
  }

  getList(sobSearchEntity: SobSearchEntity): Observable<SobEntity[]> {
    return this.http.post<SobEntity[]>(this.apiUrl + '/list', JSON.stringify(sobSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new SobEntity(item);
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

  count(sobSearchEntity: SobSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(sobSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getId(sobId: string): Observable<SobEntity> {
    return this.http.post<SobEntity>(this.apiUrl + '/get', JSON.stringify({Id: sobId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new SobEntity(r.body);
      }),
    );
  }


  add(sobEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(sobEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(sobEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(sobEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  delete(sobEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(sobEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}

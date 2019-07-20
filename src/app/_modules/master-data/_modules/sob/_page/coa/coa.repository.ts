import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CurrencyEntity } from '../../../../_backend/currency/currency.entity';
import { CurrencySearchEntity } from '../../../../_backend/currency/currency.searchentity';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';
import { CoaEntity } from '../../../../_backend/coa/coa.entity';

@Injectable({
  providedIn: 'root',
})
export class CoaRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/setOfBook';
  }

  getList(coaSearchEntity: CoaSearchEntity): Observable<CoaEntity[]> {
    return this.http.post<CoaEntity[]>(this.apiUrl + '/list', JSON.stringify(coaSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new CoaEntity(item);
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

  count(coaSearchEntity: CoaSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(coaSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getId(coaId: string): Observable<CoaEntity> {
    return this.http.post<CoaEntity>(this.apiUrl + '/get', JSON.stringify({Id: coaId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new CoaEntity(r.body);
      }),
    );
  }


  add(coaEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(coaEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(coaEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(coaEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  delete(coaEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(coaEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}

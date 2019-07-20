import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FiscalYearSearchEntity } from '../../../../_backend/fiscal-year/fiscal-year.searchentity';
import { FiscalYearEntity } from '../../../../_backend/fiscal-year/fiscal-year.entity';

@Injectable({
  providedIn: 'root',
})
export class FiscalYearRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/setOfBook';
  }

  getList(fiscalYearSearchEntity: FiscalYearSearchEntity): Observable<FiscalYearEntity[]> {
    return this.http.post<FiscalYearEntity[]>(this.apiUrl + '/list', JSON.stringify(fiscalYearSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new FiscalYearEntity(item);
        });
      }),
    );
  }

  count(fiscalYearSearchEntity: FiscalYearSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(fiscalYearSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getId(fiscalYearId: string): Observable<FiscalYearEntity> {
    return this.http.post<FiscalYearEntity>(this.apiUrl + '/get', JSON.stringify({Id: fiscalYearId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new FiscalYearEntity(r.body);
      }),
    );
  }


  add(fiscalYearEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(fiscalYearEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(fiscalYearEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(fiscalYearEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  delete(fiscalYearEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(fiscalYearEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}

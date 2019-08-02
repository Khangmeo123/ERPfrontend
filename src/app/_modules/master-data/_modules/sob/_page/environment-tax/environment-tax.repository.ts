import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EnvironmentTaxSearchEntity } from '../../../../_backend/environment-tax/environment-tax.searchEntity';
import { EnvironmentTaxEntity } from '../../../../_backend/environment-tax/environment-tax.entity';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentTaxRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/setOfBook';
  }

  getList(environmentTaxSearchEntity: EnvironmentTaxSearchEntity): Observable<EnvironmentTaxEntity[]> {
    return this.http.post<EnvironmentTaxEntity[]>(this.apiUrl + '/list', JSON.stringify(environmentTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new EnvironmentTaxEntity(item);
        });
      }),
    );
  }

  count(environmentTaxSearchEntity: EnvironmentTaxSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(environmentTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getId(environmentTaxId: string): Observable<EnvironmentTaxEntity> {
    return this.http.post<EnvironmentTaxEntity>(this.apiUrl + '/get', JSON.stringify({Id: environmentTaxId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new EnvironmentTaxEntity(r.body);
      }),
    );
  }


  add(environmentTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(environmentTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(environmentTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(environmentTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  deactivate(environmentTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/deactivate', JSON.stringify(environmentTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}

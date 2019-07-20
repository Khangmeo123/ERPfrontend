import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ImportTaxSearchEntity } from '../../../../_backend/import-tax/import-tax.searchEntity';
import { ImportTaxEntity } from '../../../../_backend/import-tax/import-tax.entity';

@Injectable({
  providedIn: 'root',
})
export class ImportTaxRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/setOfBook';
  }

  getList(importTaxSearchEntity: ImportTaxSearchEntity): Observable<ImportTaxEntity[]> {
    return this.http.post<ImportTaxEntity[]>(this.apiUrl + '/list', JSON.stringify(importTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new ImportTaxEntity(item);
        });
      }),
    );
  }

  count(importTaxSearchEntity: ImportTaxSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(importTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getId(importTaxId: string): Observable<ImportTaxEntity> {
    return this.http.post<ImportTaxEntity>(this.apiUrl + '/get', JSON.stringify({Id: importTaxId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new ImportTaxEntity(r.body);
      }),
    );
  }


  add(importTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(importTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(importTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(importTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  delete(importTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(importTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}

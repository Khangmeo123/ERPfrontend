import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ExportTaxSearchEntity } from '../../../../_backend/export-tax/export-tax.searchEntity';
import { ExportTaxEntity } from '../../../../_backend/export-tax/export-tax.entity';

@Injectable({
  providedIn: 'root',
})
export class ExportTaxRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/setOfBook';
  }

  getList(exportTaxSearchEntity: ExportTaxSearchEntity): Observable<ExportTaxEntity[]> {
    return this.http.post<ExportTaxEntity[]>(this.apiUrl + '/list', JSON.stringify(exportTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new ExportTaxEntity(item);
        });
      }),
    );
  }

  count(exportTaxSearchEntity: ExportTaxSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(exportTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getId(exportTaxId: string): Observable<ExportTaxEntity> {
    return this.http.post<ExportTaxEntity>(this.apiUrl + '/get', JSON.stringify({Id: exportTaxId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new ExportTaxEntity(r.body);
      }),
    );
  }


  add(exportTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(exportTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(exportTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(exportTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  delete(exportTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(exportTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NaturalResourceTaxSearchentity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.searchentity';
import { NaturalResourceTaxEntity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.entity';

@Injectable({
  providedIn: 'root',
})
export class ResourceTaxRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/setOfBook';
  }

  getList(resourceTaxSearchEntity: NaturalResourceTaxSearchentity): Observable<NaturalResourceTaxEntity[]> {
    return this.http.post<NaturalResourceTaxEntity[]>(this.apiUrl + '/list', JSON.stringify(resourceTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new NaturalResourceTaxEntity(item);
        });
      }),
    );
  }

  count(resourceTaxSearchEntity: NaturalResourceTaxSearchentity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(resourceTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getId(resourceTaxId: string): Observable<NaturalResourceTaxEntity> {
    return this.http.post<NaturalResourceTaxEntity>(this.apiUrl + '/get', JSON.stringify({Id: resourceTaxId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new NaturalResourceTaxEntity(r.body);
      }),
    );
  }


  add(resourceTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(resourceTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(resourceTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(resourceTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  deactivate(resourceTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/deactivate', JSON.stringify(resourceTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}

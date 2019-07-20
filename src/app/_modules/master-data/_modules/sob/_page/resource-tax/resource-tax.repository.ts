import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResourceTaxSearchentity } from '../../../../_backend/resource-tax/resource-tax.searchentity';
import { ResourceTaxEntity } from '../../../../_backend/resource-tax/resource-tax.entity';

@Injectable({
  providedIn: 'root',
})
export class ResourceTaxRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/setOfBook';
  }

  getList(resourceTaxSearchEntity: ResourceTaxSearchentity): Observable<ResourceTaxEntity[]> {
    return this.http.post<ResourceTaxEntity[]>(this.apiUrl + '/list', JSON.stringify(resourceTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new ResourceTaxEntity(item);
        });
      }),
    );
  }

  count(resourceTaxSearchEntity: ResourceTaxSearchentity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(resourceTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getId(resourceTaxId: string): Observable<ResourceTaxEntity> {
    return this.http.post<ResourceTaxEntity>(this.apiUrl + '/get', JSON.stringify({Id: resourceTaxId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new ResourceTaxEntity(r.body);
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

  delete(resourceTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(resourceTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CostCenterSearchEntity } from '../../../../_backend/cost-center/cost-center.searchentity';
import { CostCenterEntity } from '../../../../_backend/cost-center/cost-center.entity';

@Injectable({
  providedIn: 'root',
})
export class CostCenterRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/setOfBook';
  }

  getList(costCenterSearchEntity: CostCenterSearchEntity): Observable<CostCenterEntity[]> {
    return this.http.post<CostCenterEntity[]>(this.apiUrl + '/list', JSON.stringify(costCenterSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new CostCenterEntity(item);
        });
      }),
    );
  }

  count(costCenterSearchEntity: CostCenterSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(costCenterSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getId(costCenterId: string): Observable<CostCenterEntity> {
    return this.http.post<CostCenterEntity>(this.apiUrl + '/get', JSON.stringify({Id: costCenterId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new CostCenterEntity(r.body);
      }),
    );
  }


  add(costCenterEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(costCenterEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(costCenterEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(costCenterEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  delete(costCenterEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(costCenterEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}

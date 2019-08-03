import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SpecialConsumptionTaxEntity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.entity';
import { SpecialConsumptionTaxSearchEntity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.searchentity';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { Entities } from '../../../../../../_helpers/entity';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { UomSearchEntity } from '../../../../_backend/uom/uom.searchentity';

@Injectable({
  providedIn: 'root',
})
export class SpecialConsumptionTaxRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/set-of-book/special-consumption-tax';
  }

  getList(specialConsumptionTaxSearchEntity: SpecialConsumptionTaxSearchEntity): Observable<SpecialConsumptionTaxEntity[]> {
    return this.http.post<SpecialConsumptionTaxEntity[]>(this.apiUrl + '/list', JSON.stringify(specialConsumptionTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new SpecialConsumptionTaxEntity(item);
        });
      }),
    );
  }

  count(specialConsumptionTaxSearchEntity: SpecialConsumptionTaxSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(specialConsumptionTaxSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getSobList(sobSearchEntity: SobSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(this.apiUrl + '/list-set-of-book', JSON.stringify(sobSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        const {
          ids,
          exceptIds,
        } = r.body;
        return {
          ids: ids.map((item) => new SobEntity(item)),
          exceptIds: exceptIds.map((item) => new SobEntity(item)),
        };
      }),
    );
  }

  getUnitOfMeasureList(uomSearchEntity: UomSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(this.apiUrl + '/list-unit-of-measure', JSON.stringify(uomSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        const {
          ids,
          exceptIds,
        } = r.body;
        return {
          ids: ids.map((item) => new SobEntity(item)),
          exceptIds: exceptIds.map((item) => new SobEntity(item)),
        };
      }),
    );
  }

  getId(specialConsumptionTaxId: string): Observable<SpecialConsumptionTaxEntity> {
    return this.http.post<SpecialConsumptionTaxEntity>(this.apiUrl + '/get', JSON.stringify({Id: specialConsumptionTaxId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new SpecialConsumptionTaxEntity(r.body);
      }),
    );
  }


  add(specialConsumptionTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(specialConsumptionTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(specialConsumptionTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(specialConsumptionTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  deactivate(specialConsumptionTaxEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/deactivate', JSON.stringify(specialConsumptionTaxEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  public getParentTaxList(parentTaxSearchEntity: SpecialConsumptionTaxSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(
      `${this.apiUrl}/list-parent-tax`,
      parentTaxSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<Entities>) => {
          const entities: Entities = new Entities();
          entities.ids = response.body.ids.map((item) => new SpecialConsumptionTaxEntity(item));
          entities.exceptIds = response.body.exceptIds.map((item) => new SpecialConsumptionTaxEntity(item));
          return entities;
        }),
      );
  }
}

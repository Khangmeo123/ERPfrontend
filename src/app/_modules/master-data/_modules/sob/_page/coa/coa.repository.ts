import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { Entities } from '../../../../../../_helpers/entity';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';
import { CoaEntity } from '../../../../_backend/coa/coa.entity';
import { CharacteristicEntity } from '../../../../_backend/characteristic/characteristic.entity';

@Injectable({
  providedIn: 'root',
})
export class CoaRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/set-of-book/chart-of-account';
  }

  getList(coaSearchEntity: CoaSearchEntity): Observable<CoaEntity[]> {
    return this.http.post<CoaEntity[]>(this.apiUrl + '/list', JSON.stringify(coaSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map(
          (item) => {
            return new CoaEntity(item);
          },
        );
      }),
    );
  }

  getCharacteristicList(): Observable<CharacteristicEntity[]> {
    return this.http.post<CharacteristicEntity[]>(this.apiUrl + '/list-characteristic', '{}',
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => new CharacteristicEntity(item));
      }),
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

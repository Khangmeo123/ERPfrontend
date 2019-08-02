import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { Entities } from '../../../../../../_helpers/entity';
import { VoucherListSearchEntity } from '../../../../_backend/voucher-list/voucher-list.searchentity';
import { VoucherListEntity } from '../../../../_backend/voucher-list/voucher-list.entity';

@Injectable({
  providedIn: 'root',
})
export class VoucherListRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/set-of-book/voucher';
  }

  getList(voucherSearchEntity: VoucherListSearchEntity): Observable<VoucherListEntity[]> {
    return this.http.post<VoucherListEntity[]>(this.apiUrl + '/list', JSON.stringify(voucherSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new VoucherListEntity(item);
        });
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

  count(voucherSearchEntity: VoucherListSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(voucherSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getId(voucherId: string): Observable<VoucherListEntity> {
    return this.http.post<VoucherListEntity>(this.apiUrl + '/get', JSON.stringify({Id: voucherId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new VoucherListEntity(r.body);
      }),
    );
  }


  add(voucherEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(voucherEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(voucherEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(voucherEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  deactivate(voucherEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/deactivate', JSON.stringify(voucherEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}

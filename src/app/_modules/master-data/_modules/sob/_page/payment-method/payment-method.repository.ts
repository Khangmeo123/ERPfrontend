import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaymentMethodSearchEntity } from '../../../../_backend/payment-method/payment-method.searchentity';
import { PaymentMethodEntity } from '../../../../_backend/payment-method/payment-method.entity';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { Entities } from '../../../../../../_helpers/entity';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/set-of-book/payment-method';
  }

  getList(paymentMethodSearchEntity: PaymentMethodSearchEntity): Observable<PaymentMethodEntity[]> {
    return this.http.post<PaymentMethodEntity[]>(this.apiUrl + '/list', JSON.stringify(paymentMethodSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new PaymentMethodEntity(item);
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
        }
      }),
    );
  }

  count(paymentMethodSearchEntity: PaymentMethodSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(paymentMethodSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getId(paymentMethodId: string): Observable<PaymentMethodEntity> {
    return this.http.post<PaymentMethodEntity>(this.apiUrl + '/get', JSON.stringify({Id: paymentMethodId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new PaymentMethodEntity(r.body);
      }),
    );
  }


  add(paymentMethodEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(paymentMethodEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(paymentMethodEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(paymentMethodEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  delete(paymentMethodEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(paymentMethodEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}

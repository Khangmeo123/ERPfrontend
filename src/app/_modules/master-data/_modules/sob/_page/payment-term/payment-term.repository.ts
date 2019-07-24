import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaymentTermSearchEntity } from '../../../../_backend/payment-term/payment-term.searchentity';
import { PaymentTermEntity } from '../../../../_backend/payment-term/payment-term.entity';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { Entities } from '../../../../../../_helpers/entity';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';

@Injectable({
  providedIn: 'root',
})
export class PaymentTermRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/set-of-book/payment-term';
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

  getList(paymentTermSearchEntity: PaymentTermSearchEntity): Observable<PaymentTermEntity[]> {
    return this.http.post<PaymentTermEntity[]>(this.apiUrl + '/list', JSON.stringify(paymentTermSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new PaymentTermEntity(item);
        });
      }),
    );
  }

  count(paymentTermSearchEntity: PaymentTermSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(paymentTermSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getId(paymentTermId: string): Observable<PaymentTermEntity> {
    return this.http.post<PaymentTermEntity>(this.apiUrl + '/get', JSON.stringify({Id: paymentTermId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new PaymentTermEntity(r.body);
      }),
    );
  }


  add(paymentTermEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(paymentTermEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(paymentTermEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(paymentTermEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  delete(paymentTermEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(paymentTermEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}

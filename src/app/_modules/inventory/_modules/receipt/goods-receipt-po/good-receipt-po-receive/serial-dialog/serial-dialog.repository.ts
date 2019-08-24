import { Repository } from '../../../../../../../_repositories/repository';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../../../../../environments/environment';
import { BinLocationSearchEntity, ItemDetailSearchEntity } from '../../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { Observable } from 'rxjs';
import { BinLocationEntity, ItemDetailEntity } from '../../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SerialDialogRepository extends Repository {

  apiUrl: string = `${environment.apiUrlInv}inventory/receipt/goods-receipt-po/goods-receipt-po-receive/serial-number`;

  constructor(http: HttpClient) {
    super(http);
  }

  getBinLocationList = (binLocationSearchEntity: BinLocationSearchEntity): Observable<BinLocationEntity[]> => {
    return this.http.post<BinLocationEntity[]>(
      this.apiUrl + '/serial-number/single-list-bin-location',
      binLocationSearchEntity,
      {
        observe: 'response',
      },
    ).pipe(
      map(
        (response: HttpResponse<BinLocationEntity[]>) => response.body,
      ),
    );
  };

  getItemDetailList = (itemDetailSearchEntity: ItemDetailSearchEntity): Observable<ItemDetailEntity[]> => {
    return this.http.post<ItemDetailEntity[]>(this.apiUrl + '/single-list-item-detail',
      itemDetailSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<ItemDetailEntity[]>) => response.body,
        ),
      );
  };
}

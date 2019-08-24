import { Repository } from '../../../../../../../_repositories/repository';
import { environment } from '../../../../../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BinLocationSearchEntity, ItemDetailSearchEntity } from '../../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { Observable } from 'rxjs';
import {
  BinLocationEntity,
  GoodsReceiptPOContent,
  ItemDetailEntity,
} from '../../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BatchDialogRepository extends Repository {
  apiUrl: string = `${environment.apiUrlInv}inventory/receipt/goods-receipt-po/goods-receipt-po-receive/batch`;

  constructor(http: HttpClient) {
    super(http);
  }

  getBinLocationList = (binLocationSearchEntity: BinLocationSearchEntity): Observable<BinLocationEntity[]> => {
    return this.http.post<BinLocationEntity[]>(
      this.apiUrl + '/batch/single-list-bin-location',
      binLocationSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map(
        (response: HttpResponse<BinLocationEntity[]>) => response.body,
      ),
    );
  };

  getItemDetailList = (itemDetailSearchEntity: ItemDetailSearchEntity): Observable<ItemDetailEntity[]> => {
    return this.http.post<ItemDetailEntity[]>(this.apiUrl + '/single-list-item',
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

  getGoodsReceiptPOContent = (goodsReceiptPOContentId: string) => {
    return this.http.post<GoodsReceiptPOContent>(this.apiUrl + '/batch/goods-receipt-po-content-detail',
      {goodsReceiptPOContentId},

      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map(response => new GoodsReceiptPOContent(response.body)),
    );
  };
}

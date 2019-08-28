import { Repository } from '../../../../../../../_repositories/repository';
import { environment } from '../../../../../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BinLocationSearchEntity, ItemDetailSearchEntity } from '../../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { Observable } from 'rxjs';
import {
  BatchEntity,
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
      this.apiUrl + '/single-list-bin-location',
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

  getGoodsReceiptPOContent = (id: string): Observable<GoodsReceiptPOContent> => {
    return this.http.post<GoodsReceiptPOContent>(
      this.apiUrl + '/get-goods-receipt-po-content',
      {id},
      {
        observe: 'response',
      },
    )
      .pipe(
        map(
          (response: HttpResponse<any>) => new GoodsReceiptPOContent(response.body),
        ),
      );
  };

  analyzeBatchCode = (itemDetailId: string, qrCode: string) => {
    return this.http.post<BatchEntity>(this.apiUrl + '/analyze-qr-code',
      {itemDetailId, qrCode},
      {
        observe: 'response',
      },
    )
      .pipe(
        map((response) => {
          return new BatchEntity(response.body);
        }),
      );
  };
}

import {
  BinLocationOfGoodsReceipt,
  SerialNumberOfGoodsReceipt,
  GoodsReceiptContent,
} from './../../../../../_backend/goods-receipt/goods-receipt.entity';
import {
  BinLocationOfGoodsReceiptSearch,
} from './../../../../../_backend/goods-receipt/goods-receipt.searchentity';
import { Repository } from '../../../../../../../_repositories/repository';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GoodsReceiptSerialNumberDialogRepository extends Repository {

  apiUrl: string = `${environment.apiUrlInv}inventory/receipt/goods-receipt/goods-receipt-receive/serial-number`;

  constructor(http: HttpClient) {
    super(http);
  }

  getGoodsReceiptContent = (goodsReceiptContentId: string) => {
    return this.http.post<GoodsReceiptContent>(this.apiUrl + '/get-goods-receipt-content',
      { id: goodsReceiptContentId },

      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map((response: HttpResponse<GoodsReceiptContent>) => new GoodsReceiptContent(response.body)),
    );
  };

  updateGoodsReceiptContent = (goodsReceiptContent: any) => {
    return this.http.post<GoodsReceiptContent>(this.apiUrl + '/update-goods-receipt-content',
      goodsReceiptContent,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map((response: HttpResponse<GoodsReceiptContent>) => new GoodsReceiptContent(response.body)),
    );
  }

  analyzeQRCode = (itemDetailId: string, qrCode: string): Observable<SerialNumberOfGoodsReceipt> => {
    return this.http.post<SerialNumberOfGoodsReceipt>(this.apiUrl + '/single-list-item-detail',
      { itemDetailId, qrCode },
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<SerialNumberOfGoodsReceipt>) => response.body,
        ),
      );
  }

  getBinLocationList = (binLocationOfGoodsReceiptSearch: BinLocationOfGoodsReceiptSearch): Observable<BinLocationOfGoodsReceipt[]> => {
    return this.http.post<BinLocationOfGoodsReceipt[]>(
      this.apiUrl + '/single-list-bin-location',
      binLocationOfGoodsReceiptSearch,
      {
        observe: 'response',
      },
    ).pipe(
      map(
        (response: HttpResponse<BinLocationOfGoodsReceipt[]>) => response.body,
      ),
    );
  };
}

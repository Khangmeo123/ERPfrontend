import {
  BatchEntity,
  BinLocationEntity,
  GoodsReceiptPOContent,
  SerialNumberEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import { environment } from 'src/environments/environment';
import { Repository } from 'src/app/_repositories/repository';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GoodsReceiptPOEntity,
  ItemDetailEntity,
  PurchaseOrderEntity,
  UnitOfMeasureEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import {
  BinLocationSearchEntity,
  ItemDetailSearchEntity,
  PurchaseOrderSearchEntity,
  UnitOfMeasureSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';

@Injectable({
  providedIn: 'root',
})
export class GoodsReceiptPOReceiveRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlInv + 'inventory/receipt/goods-receipt-po/goods-receipt-po-receive';
  }

  getDetail = (id: string): Observable<GoodsReceiptPOEntity> => {
    return this.http.post<GoodsReceiptPOEntity>(
      this.apiUrl + '/get',
      {
        id,
      },
      {
        observe: 'response',
      },
    )
      .pipe(
        map(
          (response: HttpResponse<GoodsReceiptPOEntity>) => new GoodsReceiptPOEntity(response.body),
        ),
      );
  };

  receive = (id: string): Observable<boolean> => {
    return this.http.post(this.apiUrl + '/receive',
      {
        id,
      },
      {
        observe: 'response',
      },
    )
      .pipe(
        map(
          (response: HttpResponse<any>) => response.body,
        ),
      );
  };

  rejectReceive = (id: string): Observable<boolean> => {
    return this.http.post<boolean>(this.apiUrl + '/reject',
      {
        id,
      },
      {
        observe: 'response',
      },
    )
      .pipe(
        map((response) => response.body),
      );
  };

  getItemDetailList = (itemDetailSearchEntity: ItemDetailSearchEntity): Observable<ItemDetailEntity[]> => {
    return this.http.post<ItemDetailEntity[]>(
      this.apiUrl + '/single-list-item-detail',
      itemDetailSearchEntity,
      {
        observe: 'response',
      },
    )
      .pipe(
        map(
          (response: HttpResponse<ItemDetailEntity[]>) => response.body,
        ),
      );
  };

  getUnitOfMeasureList = (unitOfMeasureSearchEntity: UnitOfMeasureSearchEntity): Observable<UnitOfMeasureEntity[]> => {
    return this.http.post<UnitOfMeasureEntity[]>(
      this.apiUrl + '/single-list-unit-of-measure',
      unitOfMeasureSearchEntity,
      {
        observe: 'response',
      },
    )
      .pipe(
        map(
          (response: HttpResponse<UnitOfMeasureEntity[]>) => response.body,
        ),
      );
  };

  getPurchaseOrderList = (purchaseOrdersSearchEntity: PurchaseOrderSearchEntity): Observable<PurchaseOrderEntity[]> => {
    return this.http.post<PurchaseOrderEntity[]>(
      this.apiUrl + '/single-list-purchase-order',
      purchaseOrdersSearchEntity,
      {
        observe: 'response',
      },
    )
      .pipe(
        map(
          (response: HttpResponse<PurchaseOrderEntity[]>) => response.body,
        ),
      );
  };

  getQuantityDetail = (goodsReceiptPOContentId: string) => {
    return this.http.post<GoodsReceiptPOContent>(
      this.apiUrl + '/quantity/get-goods-receipt-po-content',
      {goodsReceiptPOContentId},
      {
        observe: 'response',
      },
    )
      .pipe(
        map((response) => new GoodsReceiptPOContent(response.body)),
      );
  };

  updateQuantityDetail = (goodsReceiptPOQuantityDetail: any) => {
    return this.http.post<boolean>(this.apiUrl + '/quantity/bulk-merge',
      goodsReceiptPOQuantityDetail,
      {
        observe: 'response',
      },
    )
      .pipe(
        map((response) => response.body),
      );
  };

  getBinLocationList = (binLocationSearchEntity: BinLocationSearchEntity): Observable<BinLocationEntity[]> => {
    return this.http.post<BinLocationEntity[]>(
      this.apiUrl + '/quantity/single-list-bin-location',
      binLocationSearchEntity,
      {
        observe: 'response',
      },
    )
      .pipe(
        map(
          (response: HttpResponse<BinLocationEntity[]>) => response.body,
        ),
      );
  };

  analyzeQRCode = (itemDetailId: string, qrCode: string) => {
    return this.http.post<SerialNumberEntity>(
      this.apiUrl + '/serial-number-number/analyze-qr-code',
      {itemDetailId, qrCode},
      {
        observe: 'response',
      },
    )
      .pipe(
        map(
          (response: HttpResponse<SerialNumberEntity>) => new SerialNumberEntity(response.body),
        ),
      );
  };

  updateSerialNumber = (goodsReceiptPOSerialNumberEntities: any[]) => {
    return this.http.post<boolean>(
      this.apiUrl + '/serial-number-number/bulk-merge',
      goodsReceiptPOSerialNumberEntities,
      {
        observe: 'response',
      },
    )
      .pipe(
        map((response) => response.body),
      );
  };

  getSerialNumber = (goodsReceiptPOContentId: string) => {
    return this.http.post<GoodsReceiptPOContent>(
      this.apiUrl + '/serial-number-number/goods-receipt-po-content-detail',
      {
        goodsReceiptPOContentId,
      },
      {
        observe: 'response',
      },
    )
      .pipe(
        map(
          (response: HttpResponse<GoodsReceiptPOContent>) => new GoodsReceiptPOContent(response.body),
        ),
      );
  };

  analyzeBatchCode = (itemDetailId: string, qrCode: string) => {
    return this.http.post<BatchEntity>(this.apiUrl + '/batchDetail/analyze-qr-code',
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

  updateBatch = (goodsReceiptPOBatchEntities: any[]) => {
    return this.http.post<boolean>(
      this.apiUrl + '/batchDetail/bulk-merge',
      goodsReceiptPOBatchEntities,
      {
        observe: 'response',
      },
    )
      .pipe(
        map((response) => response.body),
      );
  };

  getBatch = (id: string) => {
    return this.http.post<GoodsReceiptPOContent>(
      this.apiUrl + '/batchDetail/goods-receipt-po-content-detail',
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
}

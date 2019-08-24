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

  getDetail = (goodsReceiptPOId: string): Observable<GoodsReceiptPOEntity> => {
    return this.http.post<GoodsReceiptPOEntity>(this.apiUrl + '/get',
      {id: goodsReceiptPOId},
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map(
        (response: HttpResponse<GoodsReceiptPOEntity>) => new GoodsReceiptPOEntity(response.body),
      ),
    );
  };

  receive = (goodsReceiptPOId: string): Observable<boolean> => {
    return this.http.post<boolean>(this.apiUrl + '/approve',
      {id: goodsReceiptPOId},
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map(response => response.body,
      ),
    );
  };

  rejectReceive = (goodsReceiptPOId: string): Observable<boolean> => {
    return this.http.post<boolean>(this.apiUrl + '/reject',
      {id: goodsReceiptPOId},
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map(response => response.body),
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

  getUnitOfMeasureList = (unitOfMeasureSearchEntity: UnitOfMeasureSearchEntity): Observable<UnitOfMeasureEntity[]> => {
    return this.http.post<UnitOfMeasureEntity[]>(
      this.apiUrl + '/single-list-unit-of-measure',
      unitOfMeasureSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<UnitOfMeasureEntity[]>) => response.body,
        ),
      );
  };

  getDocumentNumberList = (purchaseOrdersSearchEntity: PurchaseOrderSearchEntity): Observable<PurchaseOrderEntity[]> => {
    return this.http.post<PurchaseOrderEntity[]>(
      this.apiUrl + '/single-list-document-number',
      purchaseOrdersSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map(
        (response: HttpResponse<PurchaseOrderEntity[]>) => response.body,
      ),
    );
  };

  getQuantityDetail = (goodsReceiptPOContentId: string) => {
    return this.http.post<GoodsReceiptPOContent>(
      this.apiUrl + '/quantity/goods-receipt-po-content-detail',
      {goodsReceiptPOContentId},
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map(response => new GoodsReceiptPOContent(response.body)),
    );
  };

  updateQuantityDetail = (goodsReceiptPOQuantityDetail: any) => {
    return this.http.post<boolean>(this.apiUrl + '/quantity/bulk-merge',
      goodsReceiptPOQuantityDetail,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map(response => response.body),
    );
  };

  getBinLocationList = (binLocationSearchEntity: BinLocationSearchEntity): Observable<BinLocationEntity[]> => {
    return this.http.post<BinLocationEntity[]>(
      this.apiUrl + '/quantity/single-list-bin-location',
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

  analyzeQRCode = (itemDetailId: string, qrCode: string) => {
    return this.http.post<SerialNumberEntity>(
      this.apiUrl + '/serial-number/analyze-qr-code',
      {itemDetailId, qrCode},
      {
        observe: 'response',
        headers: this.getHeader(),
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
      this.apiUrl + '/serial-number/bulk-merge',
      goodsReceiptPOSerialNumberEntities,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map(response => response.body),
    );
  };

  getSerialNumber = (goodsReceiptPOContentId: string) => {
    return this.http.post<GoodsReceiptPOContent>(
      this.apiUrl + '/serial-number/goods-receipt-po-content-detail',
      {
        goodsReceiptPOContentId,
      },
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<GoodsReceiptPOContent>) => new GoodsReceiptPOContent(response.body),
        ),
      );
  };

  analyzeBatchCode = (itemDetailId: string, qrCode: string) => {
    return this.http.post<BatchEntity>(this.apiUrl + '/batch/analyze-qr-code',
      {itemDetailId, qrCode},
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map(response => {
        return new BatchEntity(response.body);
      }),
    );
  };

  updateBatch = (goodsReceiptPOBatchEntities: any[]) => {
    return this.http.post<boolean>(this.apiUrl + '/batch/bulk-merge',
      goodsReceiptPOBatchEntities,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map(response => response.body),
    );
  };

  getBatch = (goodsReceiptPOContentId: string) => {
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

import {
  BatchEntity,
  BinLocationEntity,
  GoodsReceiptPOContent,
  SerialNumberEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import {environment} from 'src/environments/environment';
import {Repository} from 'src/app/_repositories/repository';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  GoodsReceiptPOEntity,
  ItemDetailEntity,
  PurchaseOrderEntity,
  UnitOfMeasureEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import {
  BinLocationSearchEntity,
  ItemDetailSearchEntity,
  UnitOfMeasureSearchEntity,
  PurchaseOrderSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';
import {Entities} from 'src/app/_helpers/entity';

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
      // map(r => {
      //   return new GoodsReceiptPOEntity(r.body);
      // }
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
      map(r => r.body,
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
      map(r => r.body),
    );
  };

  getItemDetailList = (itemDetailSearchEntity: ItemDetailSearchEntity): Observable<ItemDetailEntity[]> => {
    return this.http.post<ItemDetailEntity[]>(this.apiUrl + '/drop-list-item',
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
      this.apiUrl + '/drop-list-unit-of-measure',
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
      this.apiUrl + '/drop-list-document-number',
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
      map(r => new GoodsReceiptPOContent(r.body)),
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
      map(r => r.body),
    );
  };

  getBinLocationList = (binLocationSearchEntity: BinLocationSearchEntity): Observable<BinLocationEntity[]> => {
    return this.http.post<BinLocationEntity[]>(
      this.apiUrl + '/quantity/drop-list-bin-location',
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
      map(r => r.body),
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
        map(r => {
          return new BatchEntity(r.body);
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
      map(r => r.body),
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
      map(r => new GoodsReceiptPOContent(r.body)),
    );
  };
}

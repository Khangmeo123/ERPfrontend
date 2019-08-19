import {
  BatchEntity,
  BinLocationEntity,
  GoodsReceiptPOContent,
  SerialNumberEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import { environment } from 'src/environments/environment';
import { Repository } from 'src/app/_repositories/repository';
import { HttpClient } from '@angular/common/http';
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
  GoodsReceiptPOBinlocationSearchEntity,
  ItemDetailSearchEntity,
  UnitOfMeasureSearchEntity,
  PurchaseOrderSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { Entities } from 'src/app/_helpers/entity';

@Injectable({
  providedIn: 'root',
})
export class GoodsReceiptPOReceiveRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlInv + 'inventory/receipt/goods-receipt-po/goods-receipt-po-receive';
  }

  getDetail(goodsReceiptPOId: string): Observable<GoodsReceiptPOEntity> {
    return this.http.post<GoodsReceiptPOEntity>(this.apiUrl + '/get', JSON.stringify({id: goodsReceiptPOId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new GoodsReceiptPOEntity(r.body);
      }),
    );
  }

  receive(goodsReceiptPOId: string): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/approve', JSON.stringify({id: goodsReceiptPOId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  rejectReceive(goodsReceiptPOId: string): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/reject', JSON.stringify({id: goodsReceiptPOId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  dropListItem(goodsReceiptPOItemDetailSearchEntity: ItemDetailSearchEntity) {
    return this.http.post<Entities>(this.apiUrl + '/drop-list-item',
      JSON.stringify(goodsReceiptPOItemDetailSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        r.body.ids = r.body.ids.map(item => {
          return new ItemDetailEntity(item);
        });
        r.body.exceptIds = r.body.exceptIds.map(item => {
          return new ItemDetailEntity(item);
        });
        return r.body;
      }),
    );
  }

  dropListUnitOfMeasure(goodsReceiptPOUnitOfMeasureSearchEntity: UnitOfMeasureSearchEntity) {
    return this.http.post<Entities>(this.apiUrl + '/drop-list-unit-of-measure',
      JSON.stringify(goodsReceiptPOUnitOfMeasureSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        r.body.ids = r.body.ids.map(item => {
          return new UnitOfMeasureEntity(item);
        });
        r.body.exceptIds = r.body.exceptIds.map(item => {
          return new UnitOfMeasureEntity(item);
        });
        return r.body;
      }),
    );
  }

  dropListDocumentNumber(purchaseOrdersSearchEntity: PurchaseOrderSearchEntity) {
    return this.http.post<Entities>(this.apiUrl + '/drop-list-document-number',
      JSON.stringify(purchaseOrdersSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        r.body.ids = r.body.ids.map(item => {
          return new PurchaseOrderEntity(item);
        });
        r.body.exceptIds = r.body.exceptIds.map(item => {
          return new PurchaseOrderEntity(item);
        });
        return r.body;
      }),
    );
  }

  getQuantityDetail(goodsReceiptPOContentId: string) {
    return this.http.post<GoodsReceiptPOContent>(this.apiUrl + '/quantity/goods-receipt-po-content-detail',
      JSON.stringify({goodsReceiptPOContentId: goodsReceiptPOContentId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => new GoodsReceiptPOContent(r.body)),
    );
  }

  updateQuantityDetail(goodsReceiptPOQuantityDetail: any) {
    return this.http.post<boolean>(this.apiUrl + '/quantity/bulk-merge',
      JSON.stringify(goodsReceiptPOQuantityDetail),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  dropListBinLocation(goodsReceiptPOBinlocationSearchEntity: GoodsReceiptPOBinlocationSearchEntity) {
    return this.http.post<Entities>(this.apiUrl + '/quantity/drop-list-bin-location',
      JSON.stringify(goodsReceiptPOBinlocationSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        r.body.ids = r.body.ids.map(item => {
          return new BinLocationEntity(item);
        });
        r.body.exceptIds = r.body.exceptIds.map(item => {
          return new BinLocationEntity(item);
        });
        return r.body;
      }),
    );
  }

  analyzeQRCode(itemDetailId: string, qrCode: string) {
    return this.http.post<SerialNumberEntity>(this.apiUrl + '/serial-number/analyze-qr-code',
      JSON.stringify({itemDetailId: itemDetailId, qrCode: qrCode}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new SerialNumberEntity(r.body);
      }),
    );
  }

  updateSerialNumber(goodsReceiptPOSerialNumberEntities: any[]) {
    return this.http.post<boolean>(this.apiUrl + '/serial-number/bulk-merge',
      JSON.stringify(goodsReceiptPOSerialNumberEntities),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getSerialNumber(goodsReceiptPOContentId: string) {
    return this.http.post<GoodsReceiptPOContent>(this.apiUrl + '/serial-number/goods-receipt-po-content-detail',
      JSON.stringify({goodsReceiptPOContentId: goodsReceiptPOContentId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => new GoodsReceiptPOContent(r.body)),
    );
  }

  analyzeBatchCode(itemDetailId: string, qrCode: string) {
    return this.http.post<BatchEntity>(this.apiUrl + '/batch/analyze-qr-code',
      JSON.stringify({itemDetailId: itemDetailId, qrCode: qrCode}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new BatchEntity(r.body);
      }),
    );
  }

  updateBatch(goodsReceiptPOBatchEntities: any[]) {
    return this.http.post<boolean>(this.apiUrl + '/batch/bulk-merge',
      JSON.stringify(goodsReceiptPOBatchEntities),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getBatch(goodsReceiptPOContentId: string) {
    return this.http.post<GoodsReceiptPOContent>(this.apiUrl + '/batch/goods-receipt-po-content-detail',
      JSON.stringify({goodsReceiptPOContentId: goodsReceiptPOContentId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => new GoodsReceiptPOContent(r.body)),
    );
  }
}

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
  ItemDetailSearchEntity,
  UnitOfMeasureSearchEntity,
  PurchaseOrderSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { Entities } from 'src/app/_helpers/entity';

@Injectable({
  providedIn: 'root',
})
export class GoodsReceiptPOApproveRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlInv + 'inventory/receipt/goods-receipt-po/goods-receipt-po-approve';
  }

  getDetail(goodsReceiptPOId: string): Observable<GoodsReceiptPOEntity> {
    return this.http.post<GoodsReceiptPOEntity>(this.apiUrl + '/get', JSON.stringify({id: goodsReceiptPOId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new GoodsReceiptPOEntity(r.body);
      }),
    );
  }

  approve(goodsReceiptPOId: string): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/approve', JSON.stringify({id: goodsReceiptPOId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  reject(goodsReceiptPOId: string): Observable<boolean> {
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
}

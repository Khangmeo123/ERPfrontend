import {environment} from 'src/environments/environment';
import {Repository} from 'src/app/_repositories/repository';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  BinLocationEntity,
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
import {Entities} from 'src/app/_helpers/entity';

@Injectable({
  providedIn: 'root',
})
export class GoodsReceiptPOApproveRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlInv + 'inventory/receipt/goods-receipt-po/goods-receipt-po-approve';
  }

  getDetail = (goodsReceiptPOId: string): Observable<GoodsReceiptPOEntity> => {
    return this.http.post<GoodsReceiptPOEntity>(
      this.apiUrl + '/get',
      {id: goodsReceiptPOId},
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map(r => {
        return new GoodsReceiptPOEntity(r.body);
      }),
    );
  };

  approve = (goodsReceiptPOId: string): Observable<boolean> => {
    return this.http.post<boolean>(
      this.apiUrl + '/approve',
      {id: goodsReceiptPOId},
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map(r => r.body),
    );
  };

  reject = (goodsReceiptPOId: string): Observable<boolean> => {
    return this.http.post<boolean>(
      this.apiUrl + '/reject',
      {id: goodsReceiptPOId},
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map(r => r.body),
    );
  };

  getItemList = (itemDetailSearchEntity: ItemDetailSearchEntity): Observable<ItemDetailEntity[]> => {
    return this.http.post<ItemDetailEntity[]>(
      this.apiUrl + '/drop-list-item',
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
    ).pipe(
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
}

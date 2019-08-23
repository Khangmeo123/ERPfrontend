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
  TaxEntity,
  UnitOfMeasureEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import {
  ItemDetailSearchEntity,
  PurchaseOrderSearchEntity,
  TaxSearchEntity,
  UnitOfMeasureSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';

@Injectable({
  providedIn: 'root',
})
export class GoodsReceiptPOApproveRepository extends Repository {

  constructor(public http: HttpClient) {
    super(http);
  }

  static getURL = (url: string) => `${environment.apiUrlInv}inventory/receipt/goods-receipt-po/goods-receipt-po-approve${url}`;

  getDetail = (id: string): Observable<GoodsReceiptPOEntity> => {
    return this.http.post<GoodsReceiptPOEntity>(
      GoodsReceiptPOApproveRepository.getURL('/get'),
      {id},
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

  approve = (id: string): Observable<boolean> => {
    return this.http.post<boolean>(
      GoodsReceiptPOApproveRepository.getURL('/approve'),
      {id},
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map(r => r.body),
    );
  };

  reject = (id: string): Observable<boolean> => {
    return this.http.post<boolean>(
      GoodsReceiptPOApproveRepository.getURL('/reject'),
      {id},
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map(r => r.body),
    );
  };

  getItemDetailList = (itemDetailSearchEntity: ItemDetailSearchEntity): Observable<ItemDetailEntity[]> => {
    return this.http.post<ItemDetailEntity[]>(
      GoodsReceiptPOApproveRepository.getURL('/single-list-item-detail'),
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
      GoodsReceiptPOApproveRepository.getURL('/single-list-unit-of-measure'),
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
      GoodsReceiptPOApproveRepository.getURL('/single-list-purchase-order'),
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

  getTaxList = (taxSearchEntity: TaxSearchEntity): Observable<TaxEntity[]> => {
    return this.http.post<TaxEntity[]>(
      GoodsReceiptPOApproveRepository.getURL('/single-list-tax-list'),
      taxSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<TaxEntity[]>) => response.body.map((item) => new TaxEntity(item)),
        ),
      );
  };
}

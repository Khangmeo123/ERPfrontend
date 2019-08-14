import { environment } from 'src/environments/environment';
import { Repository } from 'src/app/_helpers/repository';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    GoodsReceiptPOEntity,
    GoodsReceiptPOItemDetailEntity,
    GoodsReceiptPOUnitOfMeasureEntity,
    PurchaseOrdersEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import {
    GoodsReceiptPOItemDetailSearchEntity,
    GoodsReceiptPOUnitOfMeasureSearchEntity,
    PurchaseOrdersSearchEntity,
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
        return this.http.post<GoodsReceiptPOEntity>(this.apiUrl + '/get', JSON.stringify({ id: goodsReceiptPOId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new GoodsReceiptPOEntity(r.body);
                }),
            );
    }

    approve(goodsReceiptPOId: string): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/approve', JSON.stringify({ id: goodsReceiptPOId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    reject(goodsReceiptPOId: string): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/reject', JSON.stringify({ id: goodsReceiptPOId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    dropListItem(goodsReceiptPOItemDetailSearchEntity: GoodsReceiptPOItemDetailSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-item',
            JSON.stringify(goodsReceiptPOItemDetailSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new GoodsReceiptPOItemDetailEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new GoodsReceiptPOItemDetailEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    dropListUnitOfMeasure(goodsReceiptPOUnitOfMeasureSearchEntity: GoodsReceiptPOUnitOfMeasureSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-unit-of-measure',
            JSON.stringify(goodsReceiptPOUnitOfMeasureSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new GoodsReceiptPOUnitOfMeasureEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new GoodsReceiptPOUnitOfMeasureEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    dropListDocumentNumber(purchaseOrdersSearchEntity: PurchaseOrdersSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-document-number',
            JSON.stringify(purchaseOrdersSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new PurchaseOrdersEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new PurchaseOrdersEntity(item);
                    });
                    return r.body;
                }),
            );
    }
}

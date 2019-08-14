import {
    GoodsReceiptPOQuantityDetail,
    GoodsReceiptPOBinlocationEntity,
    GoodsReceiptPOSerialNumberEntity,
    GoodsReceiptPOBatchEntity,
    GoodsReceiptPOContent,
} from './../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
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
    GoodsReceiptPOBinlocationSearchEntity,
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
        return this.http.post<GoodsReceiptPOEntity>(this.apiUrl + '/get', JSON.stringify({ id: goodsReceiptPOId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new GoodsReceiptPOEntity(r.body);
                }),
            );
    }

    receive(goodsReceiptPOId: string): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/approve', JSON.stringify({ id: goodsReceiptPOId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    rejectReceive(goodsReceiptPOId: string): Observable<boolean> {
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

    getQuantityDetail(goodsReceiptPOContentId: string) {
        return this.http.post<GoodsReceiptPOContent>(this.apiUrl + '/quantity/goods-receipt-po-content-detail',
            JSON.stringify({ goodsReceiptPOContentId: goodsReceiptPOContentId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new GoodsReceiptPOContent(r.body)),
            );
    }

    updateQuantityDetail(goodsReceiptPOQuantityDetail: any) {
        return this.http.post<boolean>(this.apiUrl + '/quantity/bulk-merge',
            JSON.stringify(goodsReceiptPOQuantityDetail),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    dropListBinLocation(goodsReceiptPOBinlocationSearchEntity: GoodsReceiptPOBinlocationSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/quantity/drop-list-bin-location',
            JSON.stringify(goodsReceiptPOBinlocationSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new GoodsReceiptPOBinlocationEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new GoodsReceiptPOBinlocationEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    analyzeQRCode(itemDetailId: string, qrCode: string) {
        return this.http.post<GoodsReceiptPOSerialNumberEntity>(this.apiUrl + '/serial-number/analyze-qr-code',
            JSON.stringify({ itemDetailId: itemDetailId, qrCode: qrCode }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new GoodsReceiptPOSerialNumberEntity(r.body);
                }),
            );
    }

    updateSerialNumber(goodsReceiptPOSerialNumberEntities: any[]) {
        return this.http.post<boolean>(this.apiUrl + '/serial-number/bulk-merge',
            JSON.stringify(goodsReceiptPOSerialNumberEntities),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getSerialNumber(goodsReceiptPOContentId: string) {
        return this.http.post<GoodsReceiptPOContent>(this.apiUrl + '/serial-number/goods-receipt-po-content-detail',
            JSON.stringify({ goodsReceiptPOContentId: goodsReceiptPOContentId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new GoodsReceiptPOContent(r.body)),
            );
    }

    analyzeBatchCode(itemDetailId: string, qrCode: string) {
        return this.http.post<GoodsReceiptPOBatchEntity>(this.apiUrl + '/batch/analyze-qr-code',
            JSON.stringify({ itemDetailId: itemDetailId, qrCode: qrCode }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new GoodsReceiptPOBatchEntity(r.body);
                }),
            );
    }

    updateBatch(goodsReceiptPOBatchEntities: any[]) {
        return this.http.post<boolean>(this.apiUrl + '/batch/bulk-merge',
            JSON.stringify(goodsReceiptPOBatchEntities),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getBatch(goodsReceiptPOContentId: string) {
        return this.http.post<GoodsReceiptPOContent>(this.apiUrl + '/batch/goods-receipt-po-content-detail',
            JSON.stringify({ goodsReceiptPOContentId: goodsReceiptPOContentId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new GoodsReceiptPOContent(r.body)),
            );
    }
}

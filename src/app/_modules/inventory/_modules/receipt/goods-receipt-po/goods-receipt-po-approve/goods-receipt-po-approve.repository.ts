import { GoodsReceiptPOInventoryOrganizationEntity } from './../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import { environment } from 'src/environments/environment';
import { Repository } from 'src/app/_helpers/repository';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    GoodsReceiptPOEntity,
    GoodsReceiptPOSupplierEntity,
    GoodsReceiptPOSupplierAddressEntity,
    GoodsReceiptPORequesterEntity,
    PurchaseOrdersEntity,
    GoodsReceiptPOItemDetailEntity,
    GoodsReceiptPOUnitOfMeasureEntity,
    GoodsReceiptPOTaxEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    GoodsReceiptPOSupplierSearchEntity,
    GoodsReceiptPOSupplierAddressSearchEntity,
    GoodsReceiptPORequesterSearchEntity,
    GoodsReceiptPOInventoryOrganizationSearchEntity,
    PurchaseOrdersSearchEntity,
    GoodsReceiptPOItemDetailSearchEntity,
    GoodsReceiptPOUnitOfMeasureSearchEntity,
    GoodsReceiptPOTaxSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { Entities } from 'src/app/_helpers/entity';

@Injectable({
    providedIn: 'root',
})
export class GoodsReceiptPODetailRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/receipt/goods-receipt-po/goods-receipt-po-detail';
    }

    getDetail(goodsReceiptPOId: string): Observable<GoodsReceiptPOEntity> {
        return this.http.post<GoodsReceiptPOEntity>(this.apiUrl + '/get', JSON.stringify({ id: goodsReceiptPOId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new GoodsReceiptPOEntity(r.body);
                }),
            );
    }

    save(goodsReceiptPOEntity: any): Observable<GoodsReceiptPOEntity> {
        return this.http.post<GoodsReceiptPOEntity>(this.apiUrl + '/create', JSON.stringify(goodsReceiptPOEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new GoodsReceiptPOEntity(r.body)),
            );
    }

    send(goodsReceiptPOEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/send', JSON.stringify(goodsReceiptPOEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getPurchaseOrdersList(purchaseOrdersSearchEntity: PurchaseOrdersSearchEntity) {
        return this.http.post<GoodsReceiptPOEntity[]>(this.apiUrl + '/list-purchase-order', JSON.stringify(purchaseOrdersSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new PurchaseOrdersEntity(item);
                    });
                }),
            );
    }

    dropListSupplier(goodsReceiptPOSupplierSearchEntity: GoodsReceiptPOSupplierSearchEntity): Observable<Entities> {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-supplier', JSON.stringify(goodsReceiptPOSupplierSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new GoodsReceiptPOSupplierEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new GoodsReceiptPOSupplierEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    dropListSupplierAddress(goodsReceiptPOSupplierAddressSearchEntity: GoodsReceiptPOSupplierAddressSearchEntity): Observable<Entities> {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-supplier-address',
            JSON.stringify(goodsReceiptPOSupplierAddressSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new GoodsReceiptPOSupplierAddressEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new GoodsReceiptPOSupplierAddressEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    dropListOwner(goodsReceiptPORequesterSearchEntity: GoodsReceiptPORequesterSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-employee', JSON.stringify(goodsReceiptPORequesterSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new GoodsReceiptPORequesterEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new GoodsReceiptPORequesterEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    dropListBuyer(goodsReceiptPORequesterSearchEntity: GoodsReceiptPORequesterSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-employee', JSON.stringify(goodsReceiptPORequesterSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new GoodsReceiptPORequesterEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new GoodsReceiptPORequesterEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    dropListInventoryOrganization(goodsReceiptPOInventoryOrganizationSearchEntity: GoodsReceiptPOInventoryOrganizationSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-inventory',
            JSON.stringify(goodsReceiptPOInventoryOrganizationSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new GoodsReceiptPOInventoryOrganizationEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new GoodsReceiptPOInventoryOrganizationEntity(item);
                    });
                    return r.body;
                }),
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

    dropListTax(goodsReceiptPOTaxSearchEntity: GoodsReceiptPOTaxSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-tax',
            JSON.stringify(goodsReceiptPOTaxSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new GoodsReceiptPOTaxEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new GoodsReceiptPOTaxEntity(item);
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

    combineGoodsReceiptPO(data: any) {
        return this.http.post<GoodsReceiptPOEntity>(this.apiUrl + '/combine-goods-receipt-po-content', JSON.stringify(data),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new GoodsReceiptPOEntity(r.body)),
            );
    }
}

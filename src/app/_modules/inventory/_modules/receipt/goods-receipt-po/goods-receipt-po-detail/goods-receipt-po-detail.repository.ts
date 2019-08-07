import { environment } from 'src/environments/environment';
import { Repository } from 'src/app/_helpers/repository';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    GoodsReceiptPOEntity,
    GoodsReceiptPOSupplierEntity,
    GoodsReceiptPOSupplierAddressEntity,
    GoodsReceiptPORequesterEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    GoodsReceiptPOSupplierSearchEntity,
    GoodsReceiptPOSupplierAddressSearchEntity,
    GoodsReceiptPORequesterSearchEntity,
    GoodsReceiptPOInventoryOrganizationSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { Entities } from 'src/app/_helpers/entity';

@Injectable({
    providedIn: 'root',
})
export class GoodsReceiptPODetailRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/receipt/goods-receipt-po';
    }

    getDetail(goodsReceiptPOId: string): Observable<GoodsReceiptPOEntity> {
        return this.http.post<GoodsReceiptPOEntity>(this.apiUrl + '/get', JSON.stringify({ id: goodsReceiptPOId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new GoodsReceiptPOEntity(r.body);
                }),
            );
    }

    create(goodsReceiptPOEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(goodsReceiptPOEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    update(goodsReceiptPOEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(goodsReceiptPOEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    send(goodsReceiptPOEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/send', JSON.stringify(goodsReceiptPOEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    dropListSupplier(goodsReceiptPOSupplierSearchEntity: GoodsReceiptPOSupplierSearchEntity): Observable<Entities> {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-requester', JSON.stringify(goodsReceiptPOSupplierSearchEntity),
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
        return this.http.post<Entities>(this.apiUrl + '/drop-list-requester', JSON.stringify(goodsReceiptPOSupplierAddressSearchEntity),
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

    dropListRequester(goodsReceiptPORequesterSearchEntity: GoodsReceiptPORequesterSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-requester', JSON.stringify(goodsReceiptPORequesterSearchEntity),
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
        return this.http.post<Entities>(this.apiUrl + '/drop-list-inventory-organization',
            JSON.stringify(goodsReceiptPOInventoryOrganizationSearchEntity),
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
}

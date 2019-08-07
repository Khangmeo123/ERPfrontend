import { Repository } from 'src/app/_helpers/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
    GoodsReceiptPOEntity,
    GoodsReceiptPORequesterEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import {
    GoodsReceiptPOSearchEntity,
    GoodsReceiptPORequesterSearchEntity,
    GoodsReceiptPOInventoryOrganizationSearchEntity,
} from './../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { Entities, EnumEntity } from 'src/app/_helpers/entity';

export class GoodsReceiptPORepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'inventory/receipt/goods-receipt-po';
    }

    getList(goodsReceiptPOSearchEntity: GoodsReceiptPOSearchEntity): Observable<GoodsReceiptPOEntity[]> {
        return this.http.post<GoodsReceiptPOEntity[]>(this.apiUrl + '/list', JSON.stringify(goodsReceiptPOSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new GoodsReceiptPOEntity(item);
                    });
                }),
            );
    }

    count(goodsReceiptPOSearchEntity: GoodsReceiptPOSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(goodsReceiptPOSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
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

    enumListStatus(): Observable<EnumEntity[]> {
        return this.http.post<EnumEntity[]>(this.apiUrl + '/enum-list-status', JSON.stringify({}),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }
}

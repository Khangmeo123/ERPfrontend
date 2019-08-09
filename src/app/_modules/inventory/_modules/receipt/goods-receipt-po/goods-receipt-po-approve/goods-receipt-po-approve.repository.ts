import { environment } from 'src/environments/environment';
import { Repository } from 'src/app/_helpers/repository';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoodsReceiptPOEntity } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';

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
        return this.http.post<boolean>(this.apiUrl + '/send', JSON.stringify({ id: goodsReceiptPOId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

}

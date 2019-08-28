import { Repository } from 'src/app/_repositories/repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UnitOfMeasureOfGoodsReturnSearch, ItemDetailOfGoodsReturnSearch } from 'src/app/_modules/inventory/_backend/goods-return/goods-return.searchentity';
import { UnitOfMeasureOfGoodsReturn, ItemDetailOfGoodsReturn, GoodsReturn } from 'src/app/_modules/inventory/_backend/goods-return/goods-return.entity';

@Injectable({
    providedIn: 'root',
})

export class GoodsReturnApproveRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/issue/goods-return/goods-return-approve';
    }

    getDetail(goodsReturnId: string): Observable<GoodsReturn> {
        return this.http.post<GoodsReturn>(this.apiUrl + '/get', JSON.stringify({ id: goodsReturnId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new GoodsReturn(r.body);
                }),
            );
    }

    approve = (goodsReturnId: string): Observable<boolean> => {
        return this.http.post<boolean>(this.apiUrl + '/approve',
            { id: goodsReturnId },
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        ).pipe(
            map(response => response.body,
            ),
        );
    };

    reject = (goodsReturnId: string): Observable<boolean> => {
        return this.http.post<boolean>(this.apiUrl + '/reject',
            { id: goodsReturnId },
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        ).pipe(
            map(response => response.body),
        );
    };

    selectListUnitOfMeasure = (unitOfMeasureOfIssueSearchEntity: UnitOfMeasureOfGoodsReturnSearch)
        : Observable<UnitOfMeasureOfGoodsReturn[]> => this.http.post<UnitOfMeasureOfGoodsReturn[]>(
            this.apiUrl + '/single-list-unit-of-measure',
            JSON.stringify(unitOfMeasureOfIssueSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new UnitOfMeasureOfGoodsReturn(item);
                    });
                }),
            );

    selectListItemDetail = (itemDetailOfIssueSearchEntity: ItemDetailOfGoodsReturnSearch)
        : Observable<ItemDetailOfGoodsReturn[]> => this.http.post<ItemDetailOfGoodsReturn[]>(this.apiUrl + '/single-list-item-detail',
            JSON.stringify(itemDetailOfIssueSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new ItemDetailOfGoodsReturn(item);
                    });
                }),
            );

}

import { Repository } from 'src/app/_repositories/repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
    GoodsIssue,
    ItemDetailOfGoodsIssue,
    UnitOfMeasureOfGoodsIssue,
} from '../../../../_backend/goods-issue/goods-issue.entity';
import {
    ItemDetailOfGoodsIssueSearch,
    UnitOfMeasureOfGoodsIssueSearch,
} from '../../../../_backend/goods-issue/goods-issue.searchentity';

@Injectable({
    providedIn: 'root',
})

export class GoodsIssueApproveRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/issue/goods-issue/goods-issue-approve';
    }

    getDetail(goodsIssueId: string): Observable<GoodsIssue> {
        return this.http.post<GoodsIssue>(this.apiUrl + '/get', JSON.stringify({ id: goodsIssueId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new GoodsIssue(r.body);
                }),
            );
    }

    approve = (goodsIssueId: string): Observable<boolean> => {
        return this.http.post<boolean>(this.apiUrl + '/approve',
            { id: goodsIssueId },
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        ).pipe(
            map(response => response.body,
            ),
        );
    };

    reject = (goodsIssueId: string): Observable<boolean> => {
        return this.http.post<boolean>(this.apiUrl + '/reject',
            { id: goodsIssueId },
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        ).pipe(
            map(response => response.body),
        );
    };

    selectListUnitOfMeasure = (unitOfMeasureOfIssueSearchEntity: UnitOfMeasureOfGoodsIssueSearch)
        : Observable<UnitOfMeasureOfGoodsIssue[]> => this.http.post<UnitOfMeasureOfGoodsIssue[]>(
            this.apiUrl + '/single-list-unit-of-measure',
            JSON.stringify(unitOfMeasureOfIssueSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new UnitOfMeasureOfGoodsIssue(item);
                    });
                }),
            );

    selectListItemDetail = (itemDetailOfIssueSearchEntity: ItemDetailOfGoodsIssueSearch)
        : Observable<ItemDetailOfGoodsIssue[]> => this.http.post<ItemDetailOfGoodsIssue[]>(this.apiUrl + '/single-list-item-detail',
            JSON.stringify(itemDetailOfIssueSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new ItemDetailOfGoodsIssue(item);
                    });
                }),
            );

}

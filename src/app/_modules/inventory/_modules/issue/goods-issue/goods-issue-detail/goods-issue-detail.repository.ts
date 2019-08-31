import { Repository } from 'src/app/_repositories/repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import {
  GoodsIssue,
  InventoryOrganizationOfGoodsIssue, ItemDetailOfGoodsIssue,
  RequesterOfGoodsIssue, TaxOfGoodsIssue,
  UnitOfMeasureOfGoodsIssue,
} from '../../../../_backend/goods-issue/goods-issue.entity';
import {
  InventoryOrganizationOfGoodsIssueSearch, ItemDetailOfGoodsIssueSearch,
  RequesterOfGoodsIssueSearch, TaxOfGoodsIssueSearch, UnitOfMeasureOfGoodsIssueSearch,
} from '../../../../_backend/goods-issue/goods-issue.searchentity';

@Injectable({
    providedIn: 'root',
})

export class GoodsIssueDetailRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/issue/goods-issue/goods-issue-detail';
    }

    getDetail(goodsIssueId: string): Observable<GoodsIssue> {
        return this.http.post<GoodsIssue>(this.apiUrl + '/get', JSON.stringify({ id: goodsIssueId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new GoodsIssue(r.body);
                }),
            );
    }

    send(goodsIssueEntity: any) {
        return this.http.post<GoodsIssue>(this.apiUrl + '/send', JSON.stringify(goodsIssueEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new GoodsIssue(r.body)),
            );
    }

    save(goodsIssueEntity: any): Observable<GoodsIssue> {
        return this.http.post<GoodsIssue>(this.apiUrl + '/save', JSON.stringify(goodsIssueEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new GoodsIssue(r.body)),
            );
    }

    deactivate(goodsIssueId) {
        return this.http.post<GoodsIssue>(this.apiUrl + '/deactivate', JSON.stringify({ id: goodsIssueId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    selectListEmployeeDetail = (requesterSearchEntity: RequesterOfGoodsIssueSearch)
        : Observable<RequesterOfGoodsIssue[]> => this.http.post<RequesterOfGoodsIssue[]>(
            this.apiUrl + '/single-list-employee-detail',
            JSON.stringify(requesterSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new RequesterOfGoodsIssue(item);
                    });
                }),
            );

    selectListInventoryOrganization = (inventoryOrganizationSearchEntity: InventoryOrganizationOfGoodsIssueSearch)
        : Observable<InventoryOrganizationOfGoodsIssue[]> => this.http.post<InventoryOrganizationOfGoodsIssue[]>(
            this.apiUrl + '/single-list-inventory-organization',
            JSON.stringify(inventoryOrganizationSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new InventoryOrganizationOfGoodsIssue(item);
                    });
                }),
            );

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


    selectListTax = (taxOfIssueSearchEntity: TaxOfGoodsIssueSearch)
    : Observable<TaxOfGoodsIssue[]> => this.http.post<TaxOfGoodsIssue[]>(this.apiUrl + '/single-list-tax',
        JSON.stringify(taxOfIssueSearchEntity),
        { observe: 'response', headers: this.getHeader() }).pipe(
            map(r => {
                return r.body.map(item => {
                    return new TaxOfGoodsIssue(item);
                });
            }),
        );
}

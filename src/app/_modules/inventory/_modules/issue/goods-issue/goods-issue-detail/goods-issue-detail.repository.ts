import { Repository } from 'src/app/_repositories/repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import {
    GoodsIssueEntity,
    UnitOfMeasureOfIssueEntity,
    ItemDetailOfIssueEntity,
    TaxOfIssueEntity,
    InventoryOrganizationEntity,
    RequesterEntity,
} from 'src/app/_modules/inventory/_backend/goods-issue/goods-issue.entity';
import { Observable } from 'rxjs';
import {
    UnitOfMeasureOfIssueSearchEntity,
    ItemDetailOfIssueSearchEntity,
    TaxOfIssueSearchEntity,
    InventoryOrganizationSearchEntity, 
    RequesterSearchEntity} from 'src/app/_modules/inventory/_backend/goods-issue/goods-issue.searchentity';

@Injectable({
    providedIn: 'root',
})

export class GoodsIssueDetailRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/issue/goods-issue/goods-issue-detail';
    }

    getDetail(goodsIssueId: string): Observable<GoodsIssueEntity> {
        return this.http.post<GoodsIssueEntity>(this.apiUrl + '/get', JSON.stringify({ id: goodsIssueId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new GoodsIssueEntity(r.body);
                }),
            );
    }

    send(goodsIssueEntity: any) {
        return this.http.post<GoodsIssueEntity>(this.apiUrl + '/send', JSON.stringify(goodsIssueEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new GoodsIssueEntity(r.body)),
            );
    }

    save(goodsIssueEntity: any): Observable<GoodsIssueEntity> {
        return this.http.post<GoodsIssueEntity>(this.apiUrl + '/save', JSON.stringify(goodsIssueEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new GoodsIssueEntity(r.body)),
            );
    }

    deactivate(goodsIssueId) {
        return this.http.post<GoodsIssueEntity>(this.apiUrl + '/deactivate', JSON.stringify({ id: goodsIssueId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    selectListEmployeeDetail = (requesterSearchEntity: RequesterSearchEntity)
        : Observable<RequesterEntity[]> => this.http.post<RequesterEntity[]>(
            this.apiUrl + '/single-list-employee-detail',
            JSON.stringify(requesterSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new RequesterEntity(item);
                    });
                }),
            );

    selectListInventoryOrganization = (inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity)
        : Observable<InventoryOrganizationEntity[]> => this.http.post<InventoryOrganizationEntity[]>(
            this.apiUrl + '/single-list-inventory-organization',
            JSON.stringify(inventoryOrganizationSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new InventoryOrganizationEntity(item);
                    });
                }),
            );

    selectListUnitOfMeasure = (unitOfMeasureOfIssueSearchEntity: UnitOfMeasureOfIssueSearchEntity)
        : Observable<UnitOfMeasureOfIssueEntity[]> => this.http.post<UnitOfMeasureOfIssueEntity[]>(
            this.apiUrl + '/single-list-unit-of-measure',
            JSON.stringify(unitOfMeasureOfIssueSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new UnitOfMeasureOfIssueEntity(item);
                    });
                }),
            );

    selectListItemDetail = (itemDetailOfIssueSearchEntity: ItemDetailOfIssueSearchEntity)
        : Observable<ItemDetailOfIssueEntity[]> => this.http.post<ItemDetailOfIssueEntity[]>(this.apiUrl + '/single-list-item-detail',
            JSON.stringify(itemDetailOfIssueSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new ItemDetailOfIssueEntity(item);
                    });
                }),
            );


    selectListTax = (taxOfIssueSearchEntity: TaxOfIssueSearchEntity)
    : Observable<TaxOfIssueEntity[]> => this.http.post<TaxOfIssueEntity[]>(this.apiUrl + '/single-list-tax',
        JSON.stringify(taxOfIssueSearchEntity),
        { observe: 'response', headers: this.getHeader() }).pipe(
            map(r => {
                return r.body.map(item => {
                    return new TaxOfIssueEntity(item);
                });
            }),
        );
}
import { Repository } from 'src/app/_repositories/repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GoodsReturn, InventoryOrganizationOfGoodsReturn, EmployeeDetailOfGoodsReturn, SupplierDetailOfGoodsReturn, ItemDetailOfGoodsReturn, TaxOfGoodsReturn, UnitOfMeasureOfGoodsReturn } from 'src/app/_modules/inventory/_backend/goods-return/goods-return.entity';
import { map } from 'rxjs/operators';
import { InventoryOrganizationOfGoodsReturnSearch, EmployeeDetailOfGoodsReturnSearch, SupplierDetailOfGoodsReturnSearch, ItemDetailOfGoodsReturnSearch, TaxOfGoodsReturnSearch, UnitOfMeasureOfGoodsReturnSearch } from 'src/app/_modules/inventory/_backend/goods-return/goods-return.searchentity';

@Injectable({
    providedIn: 'root',
})

export class DeliveryDetailRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/issue/delivery/delivery-detail';
    }

    getDetail(goodsReturnId: string): Observable<GoodsReturn> {
        return this.http.post<GoodsReturn>(this.apiUrl + '/get', JSON.stringify({ id: goodsReturnId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new GoodsReturn(r.body);
                }),
            );
    }

    send(goodsReturnEntity: any) {
        return this.http.post<GoodsReturn>(this.apiUrl + '/send', JSON.stringify(goodsReturnEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new GoodsReturn(r.body)),
            );
    }

    save(goodsReturnEntity: any): Observable<GoodsReturn> {
        return this.http.post<GoodsReturn>(this.apiUrl + '/save', JSON.stringify(goodsReturnEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new GoodsReturn(r.body)),
            );
    }

    deactivate(goodsReturnId) {
        return this.http.post<GoodsReturn>(this.apiUrl + '/deactivate', JSON.stringify({ id: goodsReturnId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    selectListInventoryOrganization = (inventoryOrganizationSearchEntity: InventoryOrganizationOfGoodsReturnSearch)
        : Observable<InventoryOrganizationOfGoodsReturn[]> => this.http.post<InventoryOrganizationOfGoodsReturn[]>(
            this.apiUrl + '/single-list-inventory-organization',
            JSON.stringify(inventoryOrganizationSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new InventoryOrganizationOfGoodsReturn(item);
                    });
                }),
            );
    selectListEmployeeDetail = (employeeDetailOfGoodsReturnSearch: EmployeeDetailOfGoodsReturnSearch)
        : Observable<EmployeeDetailOfGoodsReturn[]> => this.http.post<EmployeeDetailOfGoodsReturn[]>(
            this.apiUrl + '/single-list-employee-detail',
            JSON.stringify(employeeDetailOfGoodsReturnSearch),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new EmployeeDetailOfGoodsReturn(item);
                    });
                }),
            );

    selectListSupplierDetail = (supplierDetailOfGoodsReturnSearch: SupplierDetailOfGoodsReturnSearch)
        : Observable<SupplierDetailOfGoodsReturn[]> => this.http.post<SupplierDetailOfGoodsReturn[]>(
            this.apiUrl + '/single-list-supplier-detail',
            JSON.stringify(supplierDetailOfGoodsReturnSearch),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new SupplierDetailOfGoodsReturn(item);
                    });
                }),
            );

    selectListItemDetail = (itemDetailOfGoodsReturnSearch: ItemDetailOfGoodsReturnSearch)
        : Observable<ItemDetailOfGoodsReturn[]> => this.http.post<ItemDetailOfGoodsReturn[]>(this.apiUrl + '/single-list-item-detail',
            JSON.stringify(itemDetailOfGoodsReturnSearch),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new ItemDetailOfGoodsReturn(item);
                    });
                }),
            );

    selectListTax = (taxOfIssueSearchEntity: TaxOfGoodsReturnSearch)
        : Observable<TaxOfGoodsReturn[]> => this.http.post<TaxOfGoodsReturn[]>(this.apiUrl + '/single-list-tax',
            JSON.stringify(taxOfIssueSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new TaxOfGoodsReturn(item);
                    });
                }),
            );
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
}
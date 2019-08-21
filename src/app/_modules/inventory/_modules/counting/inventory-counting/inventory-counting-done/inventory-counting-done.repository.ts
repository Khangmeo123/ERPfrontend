import {
    InventoryCounterContents,
    CounterContentByItemDetailEntity,
} from './../../../../_backend/inventory-counting/inventory-counting.entity';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_repositories/repository';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
    InventoryOrganizationOfCountingSearchEntity,
    EmployeeDetailOfCountingSearchEntity,
    ItemDetailOfCountingSearchEntity,
    UnitOfMeasureOfCountingSearchEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.searchentity';
import {
    InventoryOrganizationOfCountingEntity,
    EmployeeDetailOfCountingEntity,
    InventoryCountingEntity,
    ItemDetailOfCountingEntity,
    UnitOfMeasureOfCountingEntity,
    BinLocationOfInventoryCountingEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.entity';
import { Entities } from 'src/app/_helpers/entity';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})


export class InventoryCountingDoneRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/counting/inventory-counting/inventory-counting-done';
    }

    getDetail(inventoryCountingId: string): Observable<InventoryCountingEntity> {
        return this.http.post<InventoryCountingEntity>(this.apiUrl + '/get', JSON.stringify({ id: inventoryCountingId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new InventoryCountingEntity(r.body);
                }),
            );
    }

    getListInventoryCounter(icId: string, edId: string) {
        return this.http.post<CounterContentByItemDetailEntity[]>(this.apiUrl + '/compare-serial',
            JSON.stringify({ inventoryCountingId: icId, employeeDetailId: edId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new CounterContentByItemDetailEntity(item);
                    });
                }),
            );
    }

    // binlocation:
    getListBinLocation(ioId: string, idId: string) {
        return this.http.post<BinLocationOfInventoryCountingEntity[]>(this.apiUrl + '/list-bin-location', JSON.stringify({
            inventoryOrganizationId: ioId,
            itemDetailId: idId,
        }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new BinLocationOfInventoryCountingEntity(item);
                    });
                }),
            );
    }

    selectListItemDetailCode = (itemDetailOfCountingSearchEntity: ItemDetailOfCountingSearchEntity)
        : Observable<ItemDetailOfCountingEntity[]> => this.http.post<ItemDetailOfCountingEntity[]>(
            this.apiUrl + '/single-list-item-detail-code',
            JSON.stringify(itemDetailOfCountingSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new ItemDetailOfCountingEntity(item);
                    });
                }),
            );


    selectListUnitOfMeasure = (unitOfMeasureOfCountingSearchEntity: UnitOfMeasureOfCountingSearchEntity)
        : Observable<UnitOfMeasureOfCountingEntity[]> => this.http.post<UnitOfMeasureOfCountingEntity[]>(
            this.apiUrl + '/single-list-unit-of-measure',
            JSON.stringify(unitOfMeasureOfCountingSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new UnitOfMeasureOfCountingEntity(item);
                    });
                }),
            );

    selectListInventoryOrganization = (inventoryOrganizationOfCountingSearchEntity: InventoryOrganizationOfCountingSearchEntity)
        : Observable<InventoryOrganizationOfCountingEntity[]> => this.http.post<InventoryOrganizationOfCountingEntity[]>(
            this.apiUrl + '/single-list-inventory-organizaion', JSON.stringify(inventoryOrganizationOfCountingSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new InventoryOrganizationOfCountingEntity(item);
                    });
                }),
            );

    selectListItemDetail = (itemDetailOfCountingSearchEntity: ItemDetailOfCountingSearchEntity)
        : Observable<ItemDetailOfCountingEntity[]> => this.http.post<ItemDetailOfCountingEntity[]>(this.apiUrl + '/single-list-item-detail',
            JSON.stringify(itemDetailOfCountingSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new ItemDetailOfCountingEntity(item);
                    });
                }),
            );

}

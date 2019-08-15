import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
    InventoryOrganizationOfCountingSearchEntity
    , EmployeeDetailOfCountingSearchEntity,
    ItemDetailOfCountingSearchEntity
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.searchentity';
import {
    InventoryOrganizationOfCountingEntity
    , EmployeeDetailOfCountingEntity,
    InventoryCountingEntity,
    ItemDetailOfCountingEntity
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.entity';
import { Entities } from 'src/app/_helpers/entity';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})


export class InventoryCountingDetailRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/counting/inventory-counting/inventory-counting-detail';
    }

    getDetail(inventoryCountingId: string): Observable<InventoryCountingEntity> {
        return this.http.post<InventoryCountingEntity>(this.apiUrl + '/get', JSON.stringify({ id: inventoryCountingId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new InventoryCountingEntity(r.body);
                }),
            );
    }

    dropListInventoryOrganization(inventoryOrganizationOfCountingSearchEntity: InventoryOrganizationOfCountingSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-inventory-organizaion',
            JSON.stringify(inventoryOrganizationOfCountingSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new InventoryOrganizationOfCountingEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new InventoryOrganizationOfCountingEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    dropListEmployeeDetail(employeeDetailOfCountingSearchEntity: EmployeeDetailOfCountingSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-employee-detail',
            JSON.stringify(employeeDetailOfCountingSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new EmployeeDetailOfCountingEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new EmployeeDetailOfCountingEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    dropListItemDetail(itemDetailOfCountingSearchEntity: ItemDetailOfCountingSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-employee-detail',
            JSON.stringify(itemDetailOfCountingSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new ItemDetailOfCountingEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new ItemDetailOfCountingEntity(item);
                    });
                    return r.body;
                }),
            );
    }
}
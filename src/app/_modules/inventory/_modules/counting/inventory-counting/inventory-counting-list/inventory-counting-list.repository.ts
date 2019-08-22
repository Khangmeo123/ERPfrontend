import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_repositories/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
    InventoryCountingSearchEntity,
    InventoryOrganizationOfCountingSearchEntity,
    EmployeeDetailOfCountingSearchEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.searchentity';
import {
    InventoryCountingEntity,
    InventoryOrganizationOfCountingEntity,
    EmployeeDetailOfCountingEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entities, EnumEntity } from 'src/app/_helpers/entity';

@Injectable({
    providedIn: 'root',
})


export class InventoryCountingListRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/counting/inventory-counting/inventory-counting-list';
    }

    getList(inventoryCountingSearchEntity: InventoryCountingSearchEntity): Observable<InventoryCountingEntity[]> {
        return this.http.post<InventoryCountingEntity[]>(this.apiUrl + '/list', JSON.stringify(inventoryCountingSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new InventoryCountingEntity(item);
                    });
                }),
            );
    }

    count(inventoryCountingSearchEntity: InventoryCountingSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(inventoryCountingSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

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

    selectListEmployeeDetail = (employeeDetailOfCountingSearchEntity: EmployeeDetailOfCountingSearchEntity)
        : Observable<EmployeeDetailOfCountingEntity[]> => this.http.post<EmployeeDetailOfCountingEntity[]>(
            this.apiUrl + '/single-list-employee-detail', JSON.stringify(employeeDetailOfCountingSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new EmployeeDetailOfCountingEntity(item);
                    });
                }),
            );


    enumListStatus(): Observable<EnumEntity[]> {
        return this.http.post<EnumEntity[]>(this.apiUrl + '/enum-inventory-counting-status', JSON.stringify({}),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }
}

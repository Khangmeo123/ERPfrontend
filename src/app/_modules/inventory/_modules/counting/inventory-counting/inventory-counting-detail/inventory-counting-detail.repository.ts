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

    send(inventoryCountingEntity: any) {
        return this.http.post<InventoryCountingEntity>(this.apiUrl + '/send', JSON.stringify(inventoryCountingEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new InventoryCountingEntity(r.body)),
            );
    }

    save(inventoryCountingEntity: any): Observable<InventoryCountingEntity> {
        return this.http.post<InventoryCountingEntity>(this.apiUrl + '/save', JSON.stringify(inventoryCountingEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new InventoryCountingEntity(r.body)),
            );
    }

    delete(inventoryCountingId: string) {
        return this.http.post<InventoryCountingEntity>(this.apiUrl + '/delete', JSON.stringify({ id: inventoryCountingId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

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

    getListItemDetail(data: any) {
        return this.http.post<BinLocationOfInventoryCountingEntity[]>(this.apiUrl + '/list-item-detail', JSON.stringify({ selected: data }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new ItemDetailOfCountingEntity(item);
                    });
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

    dropListItemDetailCode(itemDetailOfCountingSearchEntity: ItemDetailOfCountingSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-item-detail-code',
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

    dropListItemDetail(itemDetailOfCountingSearchEntity: ItemDetailOfCountingSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-item-detail',
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

    dropListUnitOfMeasure(unitOfMeasureOfCountingSearchEntity: UnitOfMeasureOfCountingSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-unit-of-measure',
            JSON.stringify(unitOfMeasureOfCountingSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new UnitOfMeasureOfCountingEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new UnitOfMeasureOfCountingEntity(item);
                    });
                    return r.body;
                }),
            );
    }
}

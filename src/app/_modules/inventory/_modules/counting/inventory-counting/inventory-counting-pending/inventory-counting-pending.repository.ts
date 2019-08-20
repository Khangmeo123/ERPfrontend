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


export class InventoryCountingPendingRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/counting/inventory-counting/inventory-counting-pending';
    }

    getDetail(inventoryCountingId: string): Observable<InventoryCountingEntity> {
        return this.http.post<InventoryCountingEntity>(this.apiUrl + '/get', JSON.stringify({ id: inventoryCountingId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new InventoryCountingEntity(r.body);
                }),
            );
    }

    save(inventoryCountingEntity: any): Observable<InventoryCountingEntity> {
        return this.http.post<InventoryCountingEntity>(this.apiUrl + '/save', JSON.stringify(inventoryCountingEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new InventoryCountingEntity(r.body)),
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

    analyzeCodeOutSide(id: string, code: string) {
        return this.http.post<InventoryCounterContents>(this.apiUrl + '/scan-qr-code',
            JSON.stringify({ inventoryCountingId: id, qrCode: code }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new InventoryCounterContents(r.body);
                }),
            );
    }

    resetInventoryCounterContent(id: string, ids: string[]) {
        return this.http.post<any>(this.apiUrl + '/reset-result',
            JSON.stringify({ inventoryCountingId: id, inventoryCountingContentIds: ids }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    updateQuantity(icId: string, idId: string, quantityNumber: number) {
        return this.http.post<InventoryCounterContents>(this.apiUrl + '/update-quantity',
            JSON.stringify({ inventoryCountingId: icId, itemDetailId: idId, quantity: quantityNumber }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new InventoryCounterContents(r.body);
                }),
            );
    }

    // serialNumber:
    getListSerialNumber(id: string, icId: string) {
        return this.http.post<CounterContentByItemDetailEntity[]>(this.apiUrl + '/serial-number/list-counter-content-by-item-detail',
            JSON.stringify({ itemDetailId: id, inventoryCountingId: icId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new CounterContentByItemDetailEntity(item);
                    });
                }),
            );
    }

    analyzeSerialCode(idId: string, icId: string, code: string) {
        return this.http.post<CounterContentByItemDetailEntity>(this.apiUrl + '/scan-qr-code-serial-number',
            JSON.stringify({ itemDetailId: idId, inventonryCountingId: icId, qrCode: code }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new CounterContentByItemDetailEntity(r.body);
                }),
            );
    }

    deleteSerialNumber(id: string) {
        return this.http.post<any>(this.apiUrl + '/serial-number/analyze-qr-code',
            JSON.stringify({ serialNumberId: id }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    deleteMultipleSerialNumber(icId: string, listIds: string[]) {
        return this.http.post<any>(this.apiUrl + '/serial-number/import',
            JSON.stringify({ inventoryCountingId: icId, ids: listIds }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    importSerialNumber(idId: string, icId: string, file: any) {
        const formData = new FormData();
        formData.append('file', file[0]);
        return this.http.post(this.apiUrl + '/serial-number/import', formData,
            {
                params: {
                    ItemDetailId: idId,
                    InventoryCountingId: icId,
                },
                observe: 'response',
                headers: this.getHeader(),
            },
        ).pipe(
            map(r => r.body),
        );
    }

    // batch:
    getBatchList(id: string, icId: string) {
        return this.http.post<CounterContentByItemDetailEntity[]>(this.apiUrl + '/batch/list-counter-content-by-item-detail',
            JSON.stringify({ itemDetailId: id, inventoryCountingId: icId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new CounterContentByItemDetailEntity(item);
                    });
                }),
            );
    }

    analyzeBatchCode(idId: string, icId: string, code: string) {
        return this.http.post<CounterContentByItemDetailEntity>(this.apiUrl + '/scan-qr-code-batch',
            JSON.stringify({ itemDetailId: idId, inventoryCountingId: icId, qrCode: code }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new CounterContentByItemDetailEntity(r.body);
                }),
            );
    }

    deleteBatch(id: string) {
        return this.http.post<any>(this.apiUrl + '/batch/delete',
            JSON.stringify({ batchId: id }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    updateBatch(batch: any) {
        return this.http.post<CounterContentByItemDetailEntity>(this.apiUrl + '/update-batch',
            JSON.stringify(batch),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new CounterContentByItemDetailEntity(r.body)),
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

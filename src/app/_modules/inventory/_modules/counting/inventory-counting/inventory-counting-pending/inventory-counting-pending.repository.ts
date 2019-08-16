import { BatchOfInventoryCountingEntity } from './../../../../_backend/inventory-counting/inventory-counting.entity';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
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
    SerialNumberOfInventoryCountingEntity,
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

    getListInventoryCounter(id: string) {
        return this.http.post<SerialNumberOfInventoryCountingEntity[]>(this.apiUrl + '/serial-number/inventory-counting-pending',
            JSON.stringify({ inventoryCounterId: id }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new SerialNumberOfInventoryCountingEntity(item);
                    });
                }),
            );
    }

    // serialNumber:
    getListSerialNumber(id: string, icId: string) {
        return this.http.post<SerialNumberOfInventoryCountingEntity[]>(this.apiUrl + '/serial-number/inventory-counting-pending',
            JSON.stringify({ itemDetailId: id, inventoryCountingId: icId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new SerialNumberOfInventoryCountingEntity(item);
                    });
                }),
            );
    }

    analyzeSerialCode(id: string, code: string) {
        return this.http.post<SerialNumberOfInventoryCountingEntity>(this.apiUrl + '/serial-number/analyze-qr-code',
            JSON.stringify({ itemDetailId: id, qrCode: code }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new SerialNumberOfInventoryCountingEntity(r.body);
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

    deleteMultipleSerialNumber(serialNumberList: any[]) {
        return this.http.post<any>(this.apiUrl + '/serial-number/analyze-qr-code',
            JSON.stringify(serialNumberList),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    importSerialNumber(file: any) {
        const formData = new FormData();
        formData.append('file', file[0]);
        return this.http.post(this.apiUrl + '/import', formData,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        ).pipe(
            map(r => r.body),
        );
    }

    // batch:
    getBatchList(id: string, icId: string) {
        return this.http.post<BatchOfInventoryCountingEntity[]>(this.apiUrl + '/batch/inventory-counting-pending',
            JSON.stringify({ itemDetailId: id, inventoryCountingId: icId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new BatchOfInventoryCountingEntity(item);
                    });
                }),
            );
    }

    analyzeBatchCode(id: string, code: string) {
        return this.http.post<BatchOfInventoryCountingEntity>(this.apiUrl + '/batch/analyze-qr-code',
            JSON.stringify({ itemDetailId: id, qrCode: code }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new BatchOfInventoryCountingEntity(r.body);
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
        return this.http.post<BatchOfInventoryCountingEntity>(this.apiUrl + '/batch/update',
            JSON.stringify(batch),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new BatchOfInventoryCountingEntity(r.body)),
            );
    }

    // binlocation:
    getListBinLocation(ioId: string, iccId: string) {
        return this.http.post<BinLocationOfInventoryCountingEntity[]>(this.apiUrl + '/list/bin-location', JSON.stringify({
            inventoryOrganizationId: ioId,
            inventoryCountingContentId: iccId,
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
        return this.http.post<Entities>(this.apiUrl + '/drop-list-item-detail',
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

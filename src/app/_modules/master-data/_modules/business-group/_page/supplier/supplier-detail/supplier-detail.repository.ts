import { EnumEntity } from './../../../../../../../_helpers/entity';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SupplierEntity } from 'src/app/_modules/master-data/_backend/supplier/supplier.entity';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SupplierDetailRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/business-group/supplier/supplier-detail';
    }

    getId(supplierId: string): Observable<SupplierEntity> {
        return this.http.post<SupplierEntity>(this.apiUrl + '/get', JSON.stringify({ Id: supplierId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new SupplierEntity(r.body);
                }),
            );
    }


    add(supplierEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(supplierEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    update(supplierEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(supplierEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    delete(supplierEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(supplierEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getStatusList(): Observable<EnumEntity[]> {
        return this.http.post<EnumEntity[]>(this.apiUrl + '/enum-list-status', JSON.stringify({}),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }
}

import { Repository } from 'src/app/_helpers/repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SupplierGroupEntity } from 'src/app/_modules/master-data/_backend/supplier-group/supplier-group.entity';
import { SupplierGroupSearchEntity } from 'src/app/_modules/master-data/_backend/supplier-group/supplier-group.searchentity';
import { map } from 'rxjs/operators';
import { Entities } from 'src/app/_helpers/entity';
import { SupplierSearchEntity } from 'src/app/_modules/master-data/_backend/supplier/supplier.searchentity';
import { SupplierEntity } from 'src/app/_modules/master-data/_backend/supplier/supplier.entity';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';

@Injectable({
    providedIn: 'root',
})


export class ListSupplierRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/legal-entity/supplier-group';
    }

    getListSupplierGroup(supplierGroupSearchEntity: SupplierGroupSearchEntity): Observable<SupplierGroupEntity[]> {
        return this.http.post<SupplierGroupEntity[]>(this.apiUrl + '/list-supplier-grouping', JSON.stringify(supplierGroupSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new SupplierGroupEntity(item);
                    });
                }),
            );
    }

    countSupplierGroup(supplierGroupSearchEntity: SupplierGroupSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count-supplier-grouping', JSON.stringify(supplierGroupSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getId(supplierGroupId: string): Observable<SupplierGroupEntity> {
        return this.http.post<SupplierGroupEntity>(this.apiUrl + '/get', JSON.stringify({ Id: supplierGroupId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new SupplierGroupEntity(r.body);
                }),
            );
    }

    add(supplierGroupSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(supplierGroupSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    update(supplierGroupSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(supplierGroupSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    delete(supplierGroupSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(supplierGroupSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getListLegalEntity(legalSearchEntity: LegalSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-legal-entity', JSON.stringify(legalSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new SupplierGroupEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new SupplierGroupEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    getListSupplier(supplierSearchEntity: SupplierSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-supplier-detail', JSON.stringify(supplierSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new SupplierGroupEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new SupplierGroupEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    getListSupplierDetail(supplierSearchEntity: SupplierSearchEntity): Observable<SupplierEntity[]> {
        return this.http.post<SupplierEntity[]>(this.apiUrl + '/list-supplier-detail', JSON.stringify(supplierSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new SupplierEntity(item);
                    });
                }),
            );
    }


    countSupplierDetail(supplierSearchEntity: SupplierSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count-supplier-detail', JSON.stringify(supplierSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    addSupplier(supplierSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/bulk-add-supplier-detail', JSON.stringify(supplierSearchEntity),
        { observe: 'response', headers: this.getHeader() }).pipe(
            map(r => r.body),
        );
    }

    deleteSupplier(employeeEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/delete-supplier-detail', JSON.stringify(employeeEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }


}
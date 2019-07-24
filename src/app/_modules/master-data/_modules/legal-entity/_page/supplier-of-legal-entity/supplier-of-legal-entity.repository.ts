import { Injectable } from "@angular/core";
import { Repository } from 'src/app/_helpers/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupplierEntity } from 'src/app/_modules/master-data/_backend/supplier/supplier.entity';
import { SupplierSearchEntity } from 'src/app/_modules/master-data/_backend/supplier/supplier.searchentity';
import { Entities } from 'src/app/_helpers/entity';

@Injectable({
    providedIn: 'root',
})

export class SupplierOfLegalEntityRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/legal-entity/supplier-of-legal-entity/list-supplier-legal-entity';
    }

    getListLegal(legalSearchEntity: LegalSearchEntity): Observable<LegalEntity[]> {
        return this.http.post<LegalEntity[]>(this.apiUrl + '/list-legal-entity', JSON.stringify(legalSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new LegalEntity(item);
                    });
                }),
            );
    }

    countlegal(legalSearchEntity: LegalSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count-legal-entity', JSON.stringify(legalSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }


    getListSupplier(supplierSearchEntity: SupplierSearchEntity): Observable<SupplierEntity[]> {
        return this.http.post<LegalEntity[]>(this.apiUrl + '/list-supplier-detail', JSON.stringify(supplierSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new SupplierEntity(item);
                    });
                }),
            );
    }

    countSupplier(supplierSearchEntity: SupplierSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count-supplier-detail', JSON.stringify(supplierSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    addSupplier(supplierGroupSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/bulk-add-supplier', JSON.stringify(supplierGroupSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    deleteSupplier(supplierGroupSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/delete-supplier-detail', JSON.stringify(supplierGroupSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getListSupplierDrop(supplierSearchEntity: SupplierSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-supplier', JSON.stringify(supplierSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new SupplierEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new SupplierEntity(item);
                    });
                    return r.body;
                }),
            );
    }
}

import { Repository } from 'src/app/_helpers/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { LegalSupplierDetailEntity } from 'src/app/_modules/master-data/_backend/legal-supplier-detail/legal-supplier-detail.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entities } from 'src/app/_helpers/entity';

@Injectable({
    providedIn: 'root',
})

export class SupplierDetailRepository extends Repository{
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/legal-entity/supplier-group/detail-supplier-group';
    }

    getId(supplierId: string): Observable<LegalSupplierDetailEntity> {
        return this.http.post<LegalSupplierDetailEntity>(this.apiUrl + '/get', JSON.stringify({ Id: supplierId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new LegalSupplierDetailEntity(r.body);
                }),
            );
    }

    getListProvince(detailSypplierEntity: LegalSupplierDetailEntity) {
        return this.http.post<Entities>(this.apiUrl + '/list-province', JSON.stringify(detailSypplierEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new LegalSupplierDetailEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new LegalSupplierDetailEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    getListPaymentTerm(detailSypplierEntity: LegalSupplierDetailEntity) {
        return this.http.post<Entities>(this.apiUrl + '/list-payment-term', JSON.stringify(detailSypplierEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new LegalSupplierDetailEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new LegalSupplierDetailEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    getListBank(detailSypplierEntity: LegalSupplierDetailEntity) {
        return this.http.post<Entities>(this.apiUrl + '/list-bank', JSON.stringify(detailSypplierEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new LegalSupplierDetailEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new LegalSupplierDetailEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    getListStaffInCharge(detailSypplierEntity: LegalSupplierDetailEntity) {
        return this.http.post<Entities>(this.apiUrl + '/list-staff-in-charge', JSON.stringify(detailSypplierEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new LegalSupplierDetailEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new LegalSupplierDetailEntity(item);
                    });
                    return r.body;
                }),
            );
    }
} 
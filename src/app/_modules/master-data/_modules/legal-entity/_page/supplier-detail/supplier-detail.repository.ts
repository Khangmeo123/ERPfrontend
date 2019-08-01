import { Repository } from 'src/app/_helpers/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { LegalSupplierDetailEntity } from 'src/app/_modules/master-data/_backend/legal-supplier-detail/legal-supplier-detail.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entities } from 'src/app/_helpers/entity';
import { ProvinceSearchEntity } from 'src/app/_modules/master-data/_backend/province/province.searchentity';
import { ProvinceEntity } from 'src/app/_modules/master-data/_backend/province/province.entity';
import { PaymentTermSearchEntity } from 'src/app/_modules/master-data/_backend/payment-term/payment-term.searchentity';
import { PaymentTermEntity } from 'src/app/_modules/master-data/_backend/payment-term/payment-term.entity';
import { BankSearchEntity } from 'src/app/_modules/master-data/_backend/bank/bank.searchentity';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';
import { EmployeeEntity } from 'src/app/_modules/master-data/_backend/employee/employee.entity';
import { BankEntity } from 'src/app/_modules/master-data/_backend/bank/bank.entity';
import { BankAccountSearchEntity } from 'src/app/_modules/master-data/_backend/bank-account/bank-account.searchentity';
import { BankAccountEntity } from 'src/app/_modules/master-data/_backend/bank-account/bank-account.entity';
import { BankAccountOfLegalSearchEntity } from 'src/app/_modules/master-data/_backend/bank-account-of-legal-entity/bank-account-of-legal-entity.searchentity';
import { BankAccountOfLegalEntity } from 'src/app/_modules/master-data/_backend/bank-account-of-legal-entity/bank-account-of-legal-entity.entity';

@Injectable({
    providedIn: 'root',
})

export class LegalSupplierDetailRepository extends Repository{
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/legal-entity/supplier-detail';
    }

    getId(supplierId: string): Observable<LegalSupplierDetailEntity> {
        return this.http.post<LegalSupplierDetailEntity>(this.apiUrl + '/get', JSON.stringify({ Id: supplierId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new LegalSupplierDetailEntity(r.body);
                }),
            );
    }

    getListProvince(provinceSearchEntity: ProvinceSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-province', JSON.stringify(provinceSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new ProvinceEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new ProvinceEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    // getListSupplierGroup(supplierGroupSearchEntity: SupplierGroupSearchEntity) {
    //     return this.http.post<Entities>(this.apiUrl + '/list-province', JSON.stringify(supplierGroupSearchEntity),
    //         { observe: 'response', headers: this.getHeader() }).pipe(
    //             map(r => {
    //                 r.body.ids = r.body.ids.map(item => {
    //                     return new SupplierGroupEntity(item);
    //                 });
    //                 r.body.exceptIds = r.body.exceptIds.map(item => {
    //                     return new SupplierGroupEntity(item);
    //                 });
    //                 return r.body;
    //             }),
    //         );
    // }

    getListPaymentTerm(paymentTermSearchEntity: PaymentTermSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-payment-term', JSON.stringify(paymentTermSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new PaymentTermEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new PaymentTermEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    getListBankAccount(bankAccountSearchEntity: BankAccountOfLegalSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-bank', JSON.stringify(bankAccountSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new BankAccountOfLegalEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new BankAccountOfLegalEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    update(supplierEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(supplierEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getListStaffInCharge(employeeSearchEntity: EmployeeSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-staff-in-charge', JSON.stringify(employeeSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new EmployeeEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new EmployeeEntity(item);
                    });
                    return r.body;
                }),
            );
    }
} 
import { Repository } from 'src/app/_helpers/repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BankAccountOfLegalSearchEntity } from 'src/app/_modules/master-data/_backend/bank-account-of-legal-entity/bank-account-of-legal-entity.searchentity';
import { Entities } from 'src/app/_helpers/entity';
import { map } from 'rxjs/operators';
import { BankAccountOfLegalEntity } from 'src/app/_modules/master-data/_backend/bank-account-of-legal-entity/bank-account-of-legal-entity.entity';
import { Observable } from 'rxjs';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';
import { EmployeeEntity } from 'src/app/_modules/master-data/_backend/employee/employee.entity';
import { PaymentTermSearchEntity } from 'src/app/_modules/master-data/_backend/payment-term/payment-term.searchentity';
import { PaymentTermEntity } from 'src/app/_modules/master-data/_backend/payment-term/payment-term.entity';
import { ProvinceEntity } from 'src/app/_modules/master-data/_backend/province/province.entity';
import { ProvinceSearchEntity } from 'src/app/_modules/master-data/_backend/province/province.searchentity';
import { CustomerDetailOfLegalEntity } from 'src/app/_modules/master-data/_backend/legal-customer-detail/legal-customer-detail.entity';
import { BankEntity } from 'src/app/_modules/master-data/_backend/bank/bank.entity';
import { BankSearchEntity } from 'src/app/_modules/master-data/_backend/bank/bank.searchentity';

@Injectable({
    providedIn: 'root',
})

export class CustomerOfLegalEntityDetailRepository extends Repository{
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/legal-entity/customer-detail';
    }


    getId(customerId: string): Observable<CustomerDetailOfLegalEntity> {
        return this.http.post<CustomerDetailOfLegalEntity>(this.apiUrl + '/get', JSON.stringify({ Id: customerId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new CustomerDetailOfLegalEntity(r.body);
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

    getListBankAccount(bankAccountSearchEntity: BankSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-bank', JSON.stringify(bankAccountSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new BankEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new BankEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    update(customerEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(customerEntity),
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
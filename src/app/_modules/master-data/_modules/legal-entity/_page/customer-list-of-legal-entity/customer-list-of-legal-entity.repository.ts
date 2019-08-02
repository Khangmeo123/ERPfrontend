import { Injectable } from "@angular/core";
import { Repository } from 'src/app/_helpers/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entities } from 'src/app/_helpers/entity';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { CustomerSearchEntity } from 'src/app/_modules/master-data/_backend/customer/customer.searchentity';
import { CustomerEntity } from 'src/app/_modules/master-data/_backend/customer/customer.entity';

@Injectable({
    providedIn: 'root',
})

export class CustomerOfLegalEntityRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/legal-entity/customer-of-legal-entity';
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


    getListCustomer(customerSearchEntity: CustomerSearchEntity): Observable<CustomerEntity[]> {
        return this.http.post<LegalEntity[]>(this.apiUrl + '/list-customer-detail', JSON.stringify(customerSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new CustomerEntity(item);
                    });
                }),
            );
    }

    countCustomer(customerSearchEntity: CustomerSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count-customer-detail', JSON.stringify(customerSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    addCustomer(customerSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/bulk-add-customer', JSON.stringify(customerSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    deleteCustomer(customerSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/delete-customer-detail', JSON.stringify(customerSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getListCustomerDrop(customerSearchEntity: CustomerSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-customer', JSON.stringify(customerSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new CustomerEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new CustomerEntity(item);
                    });
                    return r.body;
                }),
            );
    }
}

import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CustomerGroupEntity } from 'src/app/_modules/master-data/_backend/customer-group/customer-group.entity';
import { CustomerGroupSearchEntity } from 'src/app/_modules/master-data/_backend/customer-group/customer-group.searchentity';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { Entities } from 'src/app/_helpers/entity';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { CustomerSearchEntity } from 'src/app/_modules/master-data/_backend/customer/customer.searchentity';
import { CustomerEntity } from 'src/app/_modules/master-data/_backend/customer/customer.entity';

@Injectable({
    providedIn: 'root',
})

export class ListcustomerRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/legal-entity/customer-group';
    }

    getListCustomerGroup(customerGroupSearchEntity: CustomerGroupSearchEntity): Observable<CustomerGroupEntity[]> {
        return this.http.post<CustomerGroupEntity[]>(this.apiUrl + '/list-customer-grouping', JSON.stringify(customerGroupSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new CustomerGroupEntity(item);
                    });
                }),
            );
    }

    countCustomerGroup(customerGroupSearchEntity: CustomerGroupSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count-customer-grouping', JSON.stringify(customerGroupSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getId(customerGroupId: string): Observable<CustomerGroupEntity> {
        return this.http.post<CustomerGroupEntity>(this.apiUrl + '/get-customer-grouping', JSON.stringify({ Id: customerGroupId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new CustomerGroupEntity(r.body);
                }),
            );
    }

    add(customerGroupSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/create-customer-grouping', JSON.stringify(customerGroupSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    update(customerGroupSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update-customer-grouping', JSON.stringify(customerGroupSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    delete(customerGroupSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/delete-customer-grouping', JSON.stringify(customerGroupSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getListLegalEntity(legalSearchEntity: LegalSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-legal-entity', JSON.stringify(legalSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new LegalEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new LegalEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    getListCustomerDetail(customerSearchEntity: CustomerSearchEntity): Observable<CustomerEntity[]> {
        return this.http.post<CustomerEntity[]>(this.apiUrl + '/list-customer-detail', JSON.stringify(customerSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new CustomerEntity(item);
                    });
                }),
            );
    }
}
import { EnumEntity } from './../../../../../../../_helpers/entity';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CustomerEntity } from 'src/app/_modules/master-data/_backend/customer/customer.entity';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CustomerDetailRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/business-group/customer/customer-detail';
    }

    getId(customerId: string): Observable<CustomerEntity> {
        return this.http.post<CustomerEntity>(this.apiUrl + '/get', JSON.stringify({ Id: customerId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new CustomerEntity(r.body);
                }),
            );
    }


    add(customerEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(customerEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    update(customerEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(customerEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    delete(customerEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(customerEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getStatusList(): Observable<EnumEntity[]> {
        return this.http.post<EnumEntity[]>(this.apiUrl + '/list-status', JSON.stringify({}),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { environment } from 'src/environments/environment';
import { CustomerSearchEntity } from 'src/app/_modules/master-data/_backend/customer/customer.searchentity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerEntity } from 'src/app/_modules/master-data/_backend/customer/customer.entity';
import { EnumEntity } from 'src/app/_helpers/entity';

@Injectable({
    providedIn: 'root',
})
export class CustomerListRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/business-group/customer/customer-list';
    }

    getList(customerSearchEntity: CustomerSearchEntity): Observable<CustomerEntity[]> {
        return this.http.post<CustomerEntity[]>(this.apiUrl + '/list', JSON.stringify(customerSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new CustomerEntity(item);
                    });
                }),
            );
    }

    count(customerSearchEntity: CustomerSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(customerSearchEntity),
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

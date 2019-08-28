import { Repository } from 'src/app/_repositories/repository';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Return, InventoryOrganizationOfReturn, EmployeeDetailOfReturn } from 'src/app/_modules/inventory/_backend/return/return.entity';
import { ReturnSearch, InventoryOrganizationOfReturnSearch, EmployeeDetailOfReturnSearch } from 'src/app/_modules/inventory/_backend/return/return.searchentity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnumEntity } from 'src/app/_helpers/entity';

@Injectable({
    providedIn: 'root',
})

export class ReturnRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/receipt/return/return-list';
    }


    getList = (returnSearchEntity: ReturnSearch): Observable<Return[]> => {
        return this.http.post<Return[]>(
            this.apiUrl + '/list',
            returnSearchEntity,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    (response: HttpResponse<Return[]>) => response.body,
                ),
            );
    };

    count = (returnSearchEntity: ReturnSearch): Observable<number> => {
        return this.http.post<number>(
            this.apiUrl + '/count',
            returnSearchEntity,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    (response: HttpResponse<number>) => response.body,
                ),
            );
    };

    enumListStatus = (): Observable<EnumEntity[]> => {
        return this.http.post<EnumEntity[]>(
            this.apiUrl + '/single-list-status',
            {},
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    (response: HttpResponse<EnumEntity[]>) => response.body,
                ),
            );
    };

    singleListInventoryOrganization = (inventoryOrganizationOfReturnSearch: InventoryOrganizationOfReturnSearch) => {
        return this.http.post<InventoryOrganizationOfReturn[]>(
            this.apiUrl + '/single-list-inventory-organization',
            inventoryOrganizationOfReturnSearch,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    (response: HttpResponse<InventoryOrganizationOfReturn[]>) => response.body,
                ),
            );
    };

    singleListEmployeeDetail = (requesterSearchEntity: EmployeeDetailOfReturnSearch) => {
        return this.http.post<EmployeeDetailOfReturn[]>(
            this.apiUrl + '/single-list-employee-detail',
            requesterSearchEntity,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    (response: HttpResponse<EmployeeDetailOfReturn[]>) => response.body,
                ),
            );
    };

}
import { Repository } from 'src/app/_repositories/repository';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { DeliveryOrderSearch, RequesterOfDeliveryOrderSearch, InventoryOrganizationOfDeliveryOrderSearch } from 'src/app/_modules/inventory/_backend/delivery-order/delivery-order.searchentity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeliveryOrder, RequesterOfDeliveryOrder, InventoryOrganizationOfDeliveryOrder } from 'src/app/_modules/inventory/_backend/delivery-order/delivery-order.entity';
import { EnumEntity } from 'src/app/_helpers/entity';

@Injectable({
    providedIn: 'root',
})

export class DeliveryOrderRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/issue/delivery/delivery-list';
    }

    getList = (deliveryOrderSearchEntity: DeliveryOrderSearch): Observable<DeliveryOrder[]> => {
        return this.http.post<DeliveryOrder[]>(
            this.apiUrl + '/list',
            deliveryOrderSearchEntity,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    (response: HttpResponse<DeliveryOrder[]>) => response.body,
                ),
            );
    };

    count = (deliveryOrderSearch: DeliveryOrderSearch): Observable<number> => {
        return this.http.post<number>(
            this.apiUrl + '/count',
            DeliveryOrderSearch,
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
            this.apiUrl + '/enum-list-status',
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

    singleListRequester = (requesterSearchEntity: RequesterOfDeliveryOrderSearch) => {
        return this.http.post<RequesterOfDeliveryOrder[]>(
            this.apiUrl + '/single-list-requester',
            requesterSearchEntity,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    (response: HttpResponse<RequesterOfDeliveryOrder[]>) => response.body,
                ),
            );
    };

    singleListInventoryOrganization = (inventoryOrganizationSearchEntity: InventoryOrganizationOfDeliveryOrderSearch) => {
        return this.http.post<InventoryOrganizationOfDeliveryOrder[]>(
            this.apiUrl + '/single-list-inventory',
            inventoryOrganizationSearchEntity,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    (response: HttpResponse<InventoryOrganizationOfDeliveryOrder[]>) => response.body,
                ),
            );
    };
}

import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_repositories/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DeliveryOrder, UnitOfMeasureOfDeliveryOrder, ItemDetailOfDeliveryOrder } from 'src/app/_modules/inventory/_backend/delivery-order/delivery-order.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnitOfMeasureOfDeliveryOrderSearch, ItemDetailOfDeliveryOrderSearch } from 'src/app/_modules/inventory/_backend/delivery-order/delivery-order.searchentity';

@Injectable({
    providedIn: 'root',
})

export class DeliveryOrderSendRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/issue/delivery/delivery-send';
    }

    getDetail(deliveryOrderId: string): Observable<DeliveryOrder> {
        return this.http.post<DeliveryOrder>(this.apiUrl + '/get', JSON.stringify({ id: deliveryOrderId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new DeliveryOrder(r.body);
                }),
            );
    }

    approve = (deliveryOrderId: string): Observable<boolean> => {
        return this.http.post<boolean>(this.apiUrl + '/approve',
            { id: deliveryOrderId },
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        ).pipe(
            map(response => response.body,
            ),
        );
    };

    reject = (deliveryOrderId: string): Observable<boolean> => {
        return this.http.post<boolean>(this.apiUrl + '/reject',
            { id: deliveryOrderId },
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        ).pipe(
            map(response => response.body),
        );
    };

    selectListUnitOfMeasure = (unitOfMeasureOfIssueSearchEntity: UnitOfMeasureOfDeliveryOrderSearch)
        : Observable<UnitOfMeasureOfDeliveryOrder[]> => this.http.post<UnitOfMeasureOfDeliveryOrder[]>(
            this.apiUrl + '/single-list-unit-of-measure',
            JSON.stringify(unitOfMeasureOfIssueSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new UnitOfMeasureOfDeliveryOrder(item);
                    });
                }),
            );


    selectListItemDetail = (itemDetailOfDeliveryOrderSearch: ItemDetailOfDeliveryOrderSearch)
        : Observable<ItemDetailOfDeliveryOrder[]> => this.http.post<ItemDetailOfDeliveryOrder[]>(this.apiUrl + '/single-list-item-detail',
            JSON.stringify(itemDetailOfDeliveryOrderSearch),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new ItemDetailOfDeliveryOrder(item);
                    });
                }),
            );
}
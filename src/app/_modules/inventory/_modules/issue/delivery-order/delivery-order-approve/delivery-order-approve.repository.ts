import { Repository } from 'src/app/_repositories/repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeliveryOrder, UnitOfMeasureOfDeliveryOrder, ItemDetailOfDeliveryOrder, DocumentNumberOfDeliveryOrder } from 'src/app/_modules/inventory/_backend/delivery-order/delivery-order.entity';
import { UnitOfMeasureOfDeliveryOrderSearch, ItemDetailOfDeliveryOrderSearch, DocumentNumberOfDeliveryOrderSearch } from 'src/app/_modules/inventory/_backend/delivery-order/delivery-order.searchentity';

@Injectable({
    providedIn: 'root',
})

export class DeliveryOrderApproveRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/issue/delivery/delivery-approve';
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
        : Observable<ItemDetailOfDeliveryOrder[]> => this.http.post<ItemDetailOfDeliveryOrder[]>(this.apiUrl + '/single-list-item',
            JSON.stringify(itemDetailOfDeliveryOrderSearch),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new ItemDetailOfDeliveryOrder(item);
                    });
                }),
            );

    selectListDocumentNumber = (documentNumberOfDeliveryOrderSearch: DocumentNumberOfDeliveryOrderSearch)
        : Observable<DocumentNumberOfDeliveryOrder[]> => this.http.post<DocumentNumberOfDeliveryOrder[]>(this.apiUrl + '/single-list-item',
            JSON.stringify(documentNumberOfDeliveryOrderSearch),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new DocumentNumberOfDeliveryOrder(item);
                    });
                }),
            );

}
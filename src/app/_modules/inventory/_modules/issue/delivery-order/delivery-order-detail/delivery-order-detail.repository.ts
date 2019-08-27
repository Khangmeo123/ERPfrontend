import { Repository } from 'src/app/_repositories/repository';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DeliveryOrder, InventoryOrganizationOfDeliveryOrder, EmployeeDetailOfDeliveryOrder, CustomerDetailOfDeliveryOrder, CustomerContactOfDeliveryOrder, SalesOrderOfDeliveryOrder, ItemDetailOfDeliveryOrder, TaxOfDeliveryOrder, UnitOfMeasureOfDeliveryOrder } from 'src/app/_modules/inventory/_backend/delivery-order/delivery-order.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InventoryOrganizationOfDeliveryOrderSearch, EmployeeDetailOfDeliveryOrderSearch, CustomerDetailOfDeliveryOrderSearch, SalesOrderOfDeliveryOrderSearch, ItemDetailOfDeliveryOrderSearch, TaxOfDeliveryOrderSearch, UnitOfMeasureOfDeliveryOrderSearch } from 'src/app/_modules/inventory/_backend/delivery-order/delivery-order.searchentity';

@Injectable({
    providedIn: 'root',
})

export class DeliveryDetailRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/issue/delivery/delivery-detail';
    }

    getDetail(deliveryOrderId: string): Observable<DeliveryOrder> {
        return this.http.post<DeliveryOrder>(this.apiUrl + '/get', JSON.stringify({ id: deliveryOrderId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new DeliveryOrder(r.body);
                }),
            );
    }

    send(deliveryOrderEntity: any) {
        return this.http.post<DeliveryOrder>(this.apiUrl + '/send', JSON.stringify(deliveryOrderEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new DeliveryOrder(r.body)),
            );
    }

    save(deliveryOrderEntity: any): Observable<DeliveryOrder> {
        return this.http.post<DeliveryOrder>(this.apiUrl + '/save', JSON.stringify(deliveryOrderEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new DeliveryOrder(r.body)),
            );
    }

    deactivate(deliveryOrderId) {
        return this.http.post<DeliveryOrder>(this.apiUrl + '/deactivate', JSON.stringify({ id: deliveryOrderId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    selectListInventoryOrganization = (inventoryOrganizationSearchEntity: InventoryOrganizationOfDeliveryOrderSearch)
        : Observable<InventoryOrganizationOfDeliveryOrder[]> => this.http.post<InventoryOrganizationOfDeliveryOrder[]>(
            this.apiUrl + '/single-list-inventory-organization',
            JSON.stringify(inventoryOrganizationSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new InventoryOrganizationOfDeliveryOrder(item);
                    });
                }),
            );
    selectListEmployeeDetail = (employeeDetailOfDeliveryOrderSearch: EmployeeDetailOfDeliveryOrderSearch)
        : Observable<EmployeeDetailOfDeliveryOrder[]> => this.http.post<EmployeeDetailOfDeliveryOrder[]>(
            this.apiUrl + '/single-list-employee-detail',
            JSON.stringify(employeeDetailOfDeliveryOrderSearch),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new EmployeeDetailOfDeliveryOrder(item);
                    });
                }),
            );

    selectListCustomerDetail = (customerDetailOfDeliveryOrderSearch: CustomerDetailOfDeliveryOrderSearch)
        : Observable<CustomerDetailOfDeliveryOrder[]> => this.http.post<CustomerDetailOfDeliveryOrder[]>(
            this.apiUrl + '/single-list-customer-detail',
            JSON.stringify(customerDetailOfDeliveryOrderSearch),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new CustomerDetailOfDeliveryOrder(item);
                    });
                }),
            );

    selectListCustomerContact = (customerDetailOfDeliveryOrderSearch: CustomerDetailOfDeliveryOrderSearch)
        : Observable<CustomerContactOfDeliveryOrder[]> => this.http.post<CustomerContactOfDeliveryOrder[]>(
            this.apiUrl + '/single-list-customer-contact',
            JSON.stringify(customerDetailOfDeliveryOrderSearch),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new CustomerContactOfDeliveryOrder(item);
                    });
                }),
            );

    getListSalesOrder = (salesOrderOfDeliveryOrderSearch: SalesOrderOfDeliveryOrderSearch): Observable<SalesOrderOfDeliveryOrder[]> => {
        return this.http.post<SalesOrderOfDeliveryOrder[]>(
            this.apiUrl + '/list-sales-order',
            salesOrderOfDeliveryOrderSearch,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    (response: HttpResponse<SalesOrderOfDeliveryOrder[]>) => response.body,
                ),
            );
    };

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

    selectListTax = (taxOfIssueSearchEntity: TaxOfDeliveryOrderSearch)
        : Observable<TaxOfDeliveryOrder[]> => this.http.post<TaxOfDeliveryOrder[]>(this.apiUrl + '/single-list-tax',
            JSON.stringify(taxOfIssueSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map(item => {
                        return new TaxOfDeliveryOrder(item);
                    });
                }),
            );
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
    combineDeliveryOrder = (data: any) => {
        return this.http.post<DeliveryOrder>(
            this.apiUrl + '/combine-delivery-content',
            data,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    (response: HttpResponse<DeliveryOrder>) => new DeliveryOrder(response.body),
                ),
            );
    };
}
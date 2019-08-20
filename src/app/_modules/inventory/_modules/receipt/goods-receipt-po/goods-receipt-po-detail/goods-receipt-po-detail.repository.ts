import { environment } from 'src/environments/environment';
import { Repository } from 'src/app/_repositories/repository';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EmployeeDetailEntity,
  GoodsReceiptPOEntity,
  ItemDetailEntity,
  PurchaseOrderEntity,
  SupplierContactEntity,
  SupplierEntity,
  TaxEntity,
  UnitOfMeasureEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  EmpoloyeeDetailSearchEntity,
  InventoryOrganizationSearchEntity,
  ItemDetailSearchEntity,
  PurchaseOrderSearchEntity,
  SupplierContactSearchEntity,
  TaxSearchEntity,
  UnitOfMeasureSearchEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { SupplierSearchEntity } from '../../../../../master-data/_backend/supplier/supplier.searchentity';
import { InventoryOrganizationEntity } from '../../../../_backend/inventory-organization/inventory-organization.entity';

@Injectable({
  providedIn: 'root',
})
export class GoodsReceiptPODetailRepository extends Repository {

  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlInv + 'inventory/receipt/goods-receipt-po/goods-receipt-po-detail';
  }

  static getURL(url: string) {
    return `${environment.apiUrlInv}inventory/receipt/goods-receipt-po/goods-receipt-po-detail${url}`;
  }

  getDetail = (id: string): Observable<GoodsReceiptPOEntity> => {
    return this.http.post(
      GoodsReceiptPODetailRepository.getURL('/get'),
      {
        id,
      },
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<GoodsReceiptPOEntity>) => new GoodsReceiptPOEntity(response.body),
        ),
      );
  };

  save = (goodsReceiptPOEntity: GoodsReceiptPOEntity): Observable<GoodsReceiptPOEntity> => {
    return this.http.post<GoodsReceiptPOEntity>(
      GoodsReceiptPODetailRepository.getURL('/save'),
      goodsReceiptPOEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<GoodsReceiptPOEntity>) => new GoodsReceiptPOEntity(response.body),
        ),
      );
  };

  send = (goodsReceiptPOEntity: GoodsReceiptPOEntity): Observable<GoodsReceiptPOEntity> => {
    return this.http.post<GoodsReceiptPOEntity>(
      GoodsReceiptPODetailRepository.getURL('/send'),
      goodsReceiptPOEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<GoodsReceiptPOEntity>) => new GoodsReceiptPOEntity(response.body),
        ),
      );
  };

  getPurchaseOrderList = (purchaseOrdersSearchEntity: PurchaseOrderSearchEntity): Observable<PurchaseOrderEntity[]> => {
    return this.http.post<PurchaseOrderEntity[]>(
      GoodsReceiptPODetailRepository.getURL('/single-list-purchase-order'),
      purchaseOrdersSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<PurchaseOrderEntity[]>) => response.body.map((item) => new PurchaseOrderEntity(item)),
        ),
      );
  };

  getSupplierList = (supplierSearchEntity: SupplierSearchEntity): Observable<SupplierEntity[]> => {
    return this.http.post<SupplierEntity[]>(
      GoodsReceiptPODetailRepository.getURL('/single-list-supplier-detail'),
      supplierSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<SupplierEntity[]>) => response.body.map((item) => new SupplierEntity(item)),
        ),
      );
  };

  getSupplierContactList = (supplierContactSearchEntity: SupplierContactSearchEntity): Observable<SupplierContactEntity[]> => {
    return this.http.post<SupplierContactEntity[]>(
      GoodsReceiptPODetailRepository.getURL('/single-list-supplier-contact'),
      supplierContactSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<SupplierContactEntity[]>) => response.body.map((item) => new SupplierContactEntity(item)),
        ),
      );
  };

  getEmployeeDetailList = (employeeDetailSearchEntity: EmpoloyeeDetailSearchEntity): Observable<EmployeeDetailEntity[]> => {
    return this.http.post<EmployeeDetailEntity[]>(
      GoodsReceiptPODetailRepository.getURL('/single-list-employee-detail'),
      employeeDetailSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<EmployeeDetailEntity[]>) => response.body.map((item) => new EmployeeDetailEntity(item)),
        ),
      );
  };

  getInventoryOrganizationList(
    inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity,
  ): Observable<InventoryOrganizationEntity[]> {
    return this.http.post<InventoryOrganizationEntity[]>(
      GoodsReceiptPODetailRepository.getURL('/single-list-inventory-organization'),
      inventoryOrganizationSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<InventoryOrganizationEntity[]>) => {
            return response.body.map(
              (item) => new InventoryOrganizationEntity(item),
            );
          },
        ),
      );
  }

  getItemDetailList = (itemDetailSearchEntity: ItemDetailSearchEntity): Observable<ItemDetailEntity[]> => {
    return this.http.post<ItemDetailEntity[]>(
      GoodsReceiptPODetailRepository.getURL('/single-list-item-detail'),
      itemDetailSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<ItemDetailEntity[]>) => response.body.map((item) => new ItemDetailEntity(item)),
        ),
      );
  };

  getUnitOfMeasureList = (unitOfMeasureSearchEntity: UnitOfMeasureSearchEntity): Observable<UnitOfMeasureEntity[]> => {
    return this.http.post<UnitOfMeasureEntity[]>(
      GoodsReceiptPODetailRepository.getURL('/single-list-unit-of-measure'),
      unitOfMeasureSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<UnitOfMeasureEntity[]>) => response.body.map((item) => new UnitOfMeasureEntity(item)),
        ),
      );
  };

  getTaxList = (taxSearchEntity: TaxSearchEntity): Observable<TaxEntity[]> => {
    return this.http.post<TaxEntity[]>(
      GoodsReceiptPODetailRepository.getURL('/single-list-tax-list'),
      taxSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<TaxEntity[]>) => response.body.map((item) => new TaxEntity(item)),
        ),
      );
  };

  combineGoodsReceiptPO = (data: any) => {
    return this.http.post<GoodsReceiptPOEntity>(
      GoodsReceiptPODetailRepository.getURL('/combine-goods-receipt-po-content'),
      data,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<GoodsReceiptPOEntity>) => new GoodsReceiptPOEntity(response.body),
        ),
      );
  };
}

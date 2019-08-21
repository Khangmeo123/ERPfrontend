import { Repository } from 'src/app/_repositories/repository';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeDetailEntity, GoodsReceiptPOEntity } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import {
  EmployeeDetailSearchEntity,
  GoodsReceiptPOSearchEntity,
  InventoryOrganizationSearchEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { EnumEntity } from 'src/app/_helpers/entity';
import { Injectable } from '@angular/core';
import { InventoryOrganizationEntity } from '../../../../_backend/inventory-organization/inventory-organization.entity';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GoodsReceiptPOListRepository extends Repository {

  apiUrl: string = environment.apiUrlInv + 'inventory/receipt/goods-receipt-po/goods-receipt-po-list';

  getList = (goodsReceiptPOSearchEntity: GoodsReceiptPOSearchEntity): Observable<GoodsReceiptPOEntity[]> => {
    return this.http.post<GoodsReceiptPOEntity[]>(
      this.apiUrl + '/list',
      goodsReceiptPOSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<GoodsReceiptPOEntity[]>) => response.body,
        ),
      );
  };

  count = (goodsReceiptPOSearchEntity: GoodsReceiptPOSearchEntity): Observable<number> => {
    return this.http.post<number>(
      this.apiUrl + '/count',
      goodsReceiptPOSearchEntity,
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

  singleListRequester = (employeeDetailSearchEntity: EmployeeDetailSearchEntity) => {
    return this.http.post<EmployeeDetailEntity[]>(
      this.apiUrl + '/single-list-requester',
      employeeDetailSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<EmployeeDetailEntity[]>) => response.body,
        ),
      );
  };

  singleListInventoryOrganization = (inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity) => {
    return this.http.post<InventoryOrganizationEntity[]>(
      this.apiUrl + '/single-list-inventory-organization',
      inventoryOrganizationSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<InventoryOrganizationEntity[]>) => response.body,
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
}

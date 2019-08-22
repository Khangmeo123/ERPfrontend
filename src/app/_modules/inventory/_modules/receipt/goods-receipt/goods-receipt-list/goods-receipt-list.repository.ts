import { Repository } from 'src/app/_repositories/repository';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnumEntity } from 'src/app/_helpers/entity';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import {
  GoodsReceiptSearch,
  EmployeeDetailOfGoodsReceiptSearch,
  InventoryOrganizationOfGoodsReceiptSearch,
} from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.searchentity';
import {
  GoodsReceipt,
  EmployeeDetailOfGoodsReceipt,
  InventoryOrganizationOfGoodsReceipt,
} from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.entity';

@Injectable({
  providedIn: 'root',
})
export class GoodsReceiptListRepository extends Repository {

  apiUrl: string = environment.apiUrlInv + 'inventory/receipt/goods-receipt/goods-receipt-list';

  getList = (goodsReceiptSearch: GoodsReceiptSearch): Observable<GoodsReceipt[]> => {
    return this.http.post<GoodsReceipt[]>(
      this.apiUrl + '/list',
      goodsReceiptSearch,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(r => {
          return r.body.map((item) => {
            return new GoodsReceipt(item);
          });
        }),
      );
  };

  count = (goodsReceiptSearch: GoodsReceiptSearch): Observable<number> => {
    return this.http.post<number>(
      this.apiUrl + '/count',
      goodsReceiptSearch,
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

  singleListRequester = (employeeDetailOfGoodsReceiptSearch: EmployeeDetailOfGoodsReceiptSearch) => {
    return this.http.post<EmployeeDetailOfGoodsReceipt[]>(
      this.apiUrl + '/single-list-requester',
      employeeDetailOfGoodsReceiptSearch,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(r => {
          return r.body.map((item) => {
            return new EmployeeDetailOfGoodsReceipt(item);
          });
        }),
      );
  };

  singleListInventoryOrganization = (inventoryOrganizationSearchEntity: InventoryOrganizationOfGoodsReceiptSearch) => {
    return this.http.post<InventoryOrganizationOfGoodsReceipt[]>(
      this.apiUrl + '/single-list-inventory-organization',
      inventoryOrganizationSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(r => {
          return r.body.map((item) => {
            return new InventoryOrganizationOfGoodsReceipt(item);
          });
        }),
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

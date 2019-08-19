import { Repository } from 'src/app/_repositories/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoodsReceiptPOEntity } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import {
  RequesterSearchEntity,
  GoodsReceiptPOSearchEntity,
  InventoryOrganizationSearchEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { EnumEntity } from 'src/app/_helpers/entity';
import { Injectable } from '@angular/core';
import { InventoryOrganizationEntity } from '../../../../_backend/inventory-organization/inventory-organization.entity';
import { EmployeeEntity } from '../../../../../master-data/_backend/employee/employee.entity';

@Injectable({
  providedIn: 'root',
})
export class GoodsReceiptPOListRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlInv + 'inventory/receipt/goods-receipt-po/goods-receipt-po-list';
  }

  getList(goodsReceiptPOSearchEntity: GoodsReceiptPOSearchEntity): Observable<GoodsReceiptPOEntity[]> {
    return this.http.post<GoodsReceiptPOEntity[]>(this.apiUrl + '/list', JSON.stringify(goodsReceiptPOSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new GoodsReceiptPOEntity(item);
        });
      }),
    );
  }

  count(goodsReceiptPOSearchEntity: GoodsReceiptPOSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(goodsReceiptPOSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  singleListRequester(goodsReceiptPORequesterSearchEntity: RequesterSearchEntity) {
    return this.http.post<EmployeeEntity[]>(
      this.apiUrl + '/single-list-requester',
      goodsReceiptPORequesterSearchEntity,
      {observe: 'response', headers: this.getHeader()},
    ).pipe(
      map(r => r.body.map((item) => new EmployeeEntity(item))),
    );
  }

  singleListInventoryOrganization(goodsReceiptPOInventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity) {
    return this.http.post<InventoryOrganizationEntity[]>(this.apiUrl + '/single-list-inventory-organization',
      JSON.stringify(goodsReceiptPOInventoryOrganizationSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body.map(item => new InventoryOrganizationEntity(item))),
    );
  }

  enumListStatus(): Observable<EnumEntity[]> {
    return this.http.post<EnumEntity[]>(this.apiUrl + '/single-list-status', JSON.stringify({}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }
}

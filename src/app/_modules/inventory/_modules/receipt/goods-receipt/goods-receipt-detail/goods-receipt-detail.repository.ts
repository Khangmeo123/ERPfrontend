import { environment } from 'src/environments/environment';
import { Repository } from 'src/app/_repositories/repository';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadFile } from 'ng-zorro-antd';
import { FileAttachmentEntity } from '../../../../_backend/file-attachment/file-attachment.entity';
import {
  PurchaseOrderOfGoodsReceipt,
  GoodsReceipt,
  SupplierDetailOfGoodsReceipt,
  SupplierContactOfGoodsReceipt,
  EmployeeDetailOfGoodsReceipt,
  InventoryOrganizationOfGoodsReceipt,
  ItemDetailOfGoodsReceipt,
  UnitOfMeasureOfGoodsReceipt,
  TaxOfGoodsReceipt,
} from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.entity';
import {
  PurchaseOrderOfGoodsReceiptSearch,
  SupplierDetailOfGoodsReceiptSearch,
  SupplierContactOfGoodsReceiptSearch,
  EmployeeDetailOfGoodsReceiptSearch,
  InventoryOrganizationOfGoodsReceiptSearch,
  ItemDetailOfGoodsReceiptSearch,
  UnitOfMeasureOfGoodsReceiptSearch,
  TaxOfGoodsReceiptSearch,
} from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.searchentity';

@Injectable({
  providedIn: 'root',
})
export class GoodsReceiptDetailRepository extends Repository {

  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlInv + 'inventory/receipt/goods-receipt/goods-receipt-detail';
  }

  getDetail = (id: string): Observable<GoodsReceipt> => {
    return this.http.post(
      this.apiUrl + '/get',
      {
        id,
      },
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(r => new GoodsReceipt(r.body)),
      );
  };

  save = (goodsReceipt: GoodsReceipt): Observable<GoodsReceipt> => {
    return this.http.post<GoodsReceipt>(
      this.apiUrl + '/save',
      goodsReceipt,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          r => new GoodsReceipt(r.body),
        ),
      );
  };

  send = (goodsReceipt: GoodsReceipt): Observable<GoodsReceipt> => {
    return this.http.post<GoodsReceipt>(
      this.apiUrl + '/send',
      goodsReceipt,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          r => new GoodsReceipt(r.body),
        ),
      );
  };

  singleListSupplier = (supplierDetailOfGoodsReceiptSearch: SupplierDetailOfGoodsReceiptSearch):
    Observable<SupplierDetailOfGoodsReceipt[]> =>
    this.http.post<SupplierDetailOfGoodsReceipt[]>(
      this.apiUrl + '/single-list-supplier-detail',
      supplierDetailOfGoodsReceiptSearch,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<SupplierDetailOfGoodsReceipt[]>) => response.body.map((item) => new SupplierDetailOfGoodsReceipt(item)),
        ),
      );

  singleListSupplierContact = (supplierContactOfGoodsReceiptSearch: SupplierContactOfGoodsReceiptSearch):
    Observable<SupplierContactOfGoodsReceipt[]> =>
    this.http.post<SupplierContactOfGoodsReceipt[]>(
      this.apiUrl + '/single-list-supplier-contact',
      supplierContactOfGoodsReceiptSearch,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<SupplierContactOfGoodsReceipt[]>) => response.body.map((item) => new SupplierContactOfGoodsReceipt(item)),
        ),
      );

  singleListEmployeeDetail = (employeeDetailOfGoodsReceiptSearch: EmployeeDetailOfGoodsReceiptSearch):
    Observable<EmployeeDetailOfGoodsReceipt[]> =>
    this.http.post<EmployeeDetailOfGoodsReceipt[]>(
      this.apiUrl + '/single-list-employee-detail',
      employeeDetailOfGoodsReceiptSearch,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<EmployeeDetailOfGoodsReceipt[]>) => response.body.map((item) => new EmployeeDetailOfGoodsReceipt(item)),
        ),
      );

  singleListInventoryOrganization = (inventoryOrganizationOfGoodsReceiptSearch: InventoryOrganizationOfGoodsReceiptSearch):
    Observable<InventoryOrganizationOfGoodsReceipt[]> =>
    this.http.post<InventoryOrganizationOfGoodsReceipt[]>(
      this.apiUrl + '/single-list-inventory-organization',
      inventoryOrganizationOfGoodsReceiptSearch,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<InventoryOrganizationOfGoodsReceipt[]>) => {
            return response.body.map(
              (item) => new InventoryOrganizationOfGoodsReceipt(item),
            );
          },
        ),
      );

  singleListItemDetail = (itemDetailOfGoodsReceiptSearch: ItemDetailOfGoodsReceiptSearch):
    Observable<ItemDetailOfGoodsReceipt[]> =>
    this.http.post<ItemDetailOfGoodsReceipt[]>(
      this.apiUrl + '/single-list-item-detail',
      itemDetailOfGoodsReceiptSearch,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<ItemDetailOfGoodsReceipt[]>) => response.body.map((item) => new ItemDetailOfGoodsReceipt(item)),
        ),
      );

  singleListUnitOfMeasure = (unitOfMeasureOfGoodsReceiptSearch: UnitOfMeasureOfGoodsReceiptSearch):
    Observable<UnitOfMeasureOfGoodsReceipt[]> =>
    this.http.post<UnitOfMeasureOfGoodsReceipt[]>(
      this.apiUrl + '/single-list-unit-of-measure',
      unitOfMeasureOfGoodsReceiptSearch,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<UnitOfMeasureOfGoodsReceipt[]>) => response.body.map((item) => new UnitOfMeasureOfGoodsReceipt(item)),
        ),
      );

  singleListTax = (taxOfGoodsReceiptSearch: TaxOfGoodsReceiptSearch): Observable<TaxOfGoodsReceipt[]> =>
    this.http.post<TaxOfGoodsReceipt[]>(
      this.apiUrl + '/single-list-tax',
      taxOfGoodsReceiptSearch,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<TaxOfGoodsReceipt[]>) => response.body.map((item) => new TaxOfGoodsReceipt(item)),
        ),
      );

  uploadFiles(files: UploadFile[]): Observable<FileAttachmentEntity[]> {
    const formData: FormData = new FormData();
    files.forEach((file: any) => {
      formData.append('files', file);
    });
    return this.http.post(
      this.apiUrl + '/upload-file',
      formData,
      {
        observe: 'response',
      },
    )
      .pipe(
        map(
          (response: HttpResponse<FileAttachmentEntity[]>) => {
            return response.body;
          },
        ),
      );
  }
}

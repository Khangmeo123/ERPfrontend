import { Repository } from 'src/app/_repositories/repository';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GoodsIssue, RequesterOfGoodsIssue, InventoryOrganizationOfGoodsIssue, UnitOfMeasureOfGoodsIssue, ItemDetailOfGoodsIssue, SerialNumberOfGoodsIssue, GoodsIssueContents } from 'src/app/_modules/inventory/_backend/goods-issue/goods-issue.entity';
import { RequesterOfGoodsIssueSearch, InventoryOrganizationOfGoodsIssueSearch, UnitOfMeasureOfGoodsIssueSearch, ItemDetailOfGoodsIssueSearch } from 'src/app/_modules/inventory/_backend/goods-issue/goods-issue.searchentity';


@Injectable({
  providedIn: 'root',
})

export class GoodsIssueSendRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlInv + 'inventory/issue/goods-issue/goods-issue-send';
  }

  getDetail(goodsIssueId: string): Observable<GoodsIssue> {
    return this.http.post<GoodsIssue>(this.apiUrl + '/get', JSON.stringify({ id: goodsIssueId }),
      { observe: 'response', headers: this.getHeader() }).pipe(
        map(r => {
          return new GoodsIssue(r.body);
        }),
      );
  }

  approve(goodsIssueId: any) {
    return this.http.post<GoodsIssue>(this.apiUrl + '/approve', JSON.stringify(goodsIssueId),
      { observe: 'response', headers: this.getHeader() }).pipe(
        map(r => new GoodsIssue(r.body)),
      );
  }

  reject(goodsIssueId: any): Observable<GoodsIssue> {
    return this.http.post<GoodsIssue>(this.apiUrl + '/reject', JSON.stringify(goodsIssueId),
      { observe: 'response', headers: this.getHeader() }).pipe(
        map(r => new GoodsIssue(r.body)),
      );
  }

  selectListEmployeeDetail = (requesterSearchEntity: RequesterOfGoodsIssueSearch)
    : Observable<RequesterOfGoodsIssue[]> => this.http.post<RequesterOfGoodsIssue[]>(
      this.apiUrl + '/single-list-employee-detail',
      JSON.stringify(requesterSearchEntity),
      { observe: 'response', headers: this.getHeader() }).pipe(
        map(r => {
          return r.body.map(item => {
            return new RequesterOfGoodsIssue(item);
          });
        }),
      );

  selectListInventoryOrganization = (inventoryOrganizationSearchEntity: InventoryOrganizationOfGoodsIssueSearch)
    : Observable<InventoryOrganizationOfGoodsIssue[]> => this.http.post<InventoryOrganizationOfGoodsIssue[]>(
      this.apiUrl + '/single-list-inventory-organization',
      JSON.stringify(inventoryOrganizationSearchEntity),
      { observe: 'response', headers: this.getHeader() }).pipe(
        map(r => {
          return r.body.map(item => {
            return new InventoryOrganizationOfGoodsIssue(item);
          });
        }),
      );

  selectListUnitOfMeasure = (unitOfMeasureOfIssueSearchEntity: UnitOfMeasureOfGoodsIssueSearch)
    : Observable<UnitOfMeasureOfGoodsIssue[]> => this.http.post<UnitOfMeasureOfGoodsIssue[]>(
      this.apiUrl + '/single-list-unit-of-measure',
      JSON.stringify(unitOfMeasureOfIssueSearchEntity),
      { observe: 'response', headers: this.getHeader() }).pipe(
        map(r => {
          return r.body.map(item => {
            return new UnitOfMeasureOfGoodsIssue(item);
          });
        }),
      );

  selectListItemDetail = (itemDetailOfIssueSearchEntity: ItemDetailOfGoodsIssueSearch)
    : Observable<ItemDetailOfGoodsIssue[]> => this.http.post<ItemDetailOfGoodsIssue[]>(this.apiUrl + '/single-list-item-detail',
      JSON.stringify(itemDetailOfIssueSearchEntity),
      { observe: 'response', headers: this.getHeader() }).pipe(
        map(r => {
          return r.body.map(item => {
            return new ItemDetailOfGoodsIssue(item);
          });
        }),
      );


  // selectListTax = (taxOfIssueSearchEntity: TaxOfIssueSearchEntity)
  // : Observable<TaxOfIssueEntity[]> => this.http.post<TaxOfIssueEntity[]>(this.apiUrl + '/single-list-tax',
  //     JSON.stringify(taxOfIssueSearchEntity),
  //     { observe: 'response', headers: this.getHeader() }).pipe(
  //         map(r => {
  //             return r.body.map(item => {
  //                 return new TaxOfIssueEntity(item);
  //             });
  //         }),
  //     );

  //SerialNumber

  analyzeQRCode = (itemDetailId: string, qrCode: string) => {
    return this.http.post<SerialNumberOfGoodsIssue>(
      this.apiUrl + '/serial-number/analyze-qr-code',
      { itemDetailId, qrCode },
      {
        observe: 'response',
      },
    )
      .pipe(
        map(
          (response: HttpResponse<SerialNumberOfGoodsIssue>) => new SerialNumberOfGoodsIssue(response.body),
        ),
      );
  };

  updateSerialNumber = (serialNumberOfIssueEntity: any[]) => {
    return this.http.post<boolean>(
      this.apiUrl + '/serial-number/update-goods-issue-content',
      serialNumberOfIssueEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    ).pipe(
      map(response => response.body),
    );
  };

  getSerialNumber = (goodsIssueContentId: string) => {
    return this.http.post<GoodsIssueContents>(
      this.apiUrl + '/serial-number/goods-receipt-po-content-detail',
      {
        goodsIssueContentId,
      },
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<GoodsIssueContents>) => new GoodsIssueContents(response.body),
        ),
      );
  };
}

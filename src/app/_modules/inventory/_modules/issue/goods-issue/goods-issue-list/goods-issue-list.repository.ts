import { Repository } from 'src/app/_repositories/repository';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { EnumEntity } from 'src/app/_helpers/entity';
import {
  GoodsIssueSearch,
  InventoryOrganizationOfGoodsIssueSearch,
  RequesterOfGoodsIssueSearch
} from '../../../../_backend/goods-issue/goods-issue.searchentity';
import {GoodsIssue, InventoryOrganizationOfGoodsIssue, RequesterOfGoodsIssue} from '../../../../_backend/goods-issue/goods-issue.entity';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class GoodsIssueRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/issue/goods-issue/goods-issue-list';
    }


    getList = (goodsIssueSearchEntity: GoodsIssueSearch): Observable<GoodsIssue[]> => {
        return this.http.post<GoodsIssue[]>(
            this.apiUrl + '/list',
          goodsIssueSearchEntity,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    (response: HttpResponse<GoodsIssue[]>) => response.body,
                ),
            );
    };

    count = (goodsIssueSearch: GoodsIssueSearch): Observable<number> => {
        return this.http.post<number>(
            this.apiUrl + '/count',
          goodsIssueSearch,
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

    singleListInventoryOrganization = (inventoryOrganizationSearchEntity: InventoryOrganizationOfGoodsIssueSearch) => {
        return this.http.post<InventoryOrganizationOfGoodsIssue[]>(
            this.apiUrl + '/single-list-inventory-organization',
            inventoryOrganizationSearchEntity,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    (response: HttpResponse<InventoryOrganizationOfGoodsIssue[]>) => response.body,
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

    singleListRequester = (requesterSearchEntity: RequesterOfGoodsIssueSearch) => {
        return this.http.post<RequesterOfGoodsIssue[]>(
          this.apiUrl + '/single-list-requester',
          requesterSearchEntity,
          {
            observe: 'response',
            headers: this.getHeader(),
          },
        )
          .pipe(
            map(
              (response: HttpResponse<RequesterOfGoodsIssue[]>) => response.body,
            ),
          );
      };

}

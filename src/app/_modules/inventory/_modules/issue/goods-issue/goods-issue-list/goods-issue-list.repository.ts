import { Repository } from 'src/app/_repositories/repository';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GoodsIssueEntity, InventoryOrganizationEntity, RequesterEntity } from 'src/app/_modules/inventory/_backend/goods-issue/goods-issue.entity';
import { Observable } from 'rxjs';
import {
    GoodsIssueSearchEntity,
    InventoryOrganizationSearchEntity,
    RequesterSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-issue/goods-issue.searchentity';
import { map } from 'rxjs/operators';
import { EnumEntity } from 'src/app/_helpers/entity';

@Injectable({
    providedIn: 'root',
})

export class GoodsIssueRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/issue/goods-issue/goods-issue-list';
    }


    getList = (goodsReceiptPOSearchEntity: GoodsIssueSearchEntity): Observable<GoodsIssueEntity[]> => {
        return this.http.post<GoodsIssueEntity[]>(
            this.apiUrl + '/list',
            goodsReceiptPOSearchEntity,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    (response: HttpResponse<GoodsIssueEntity[]>) => response.body,
                ),
            );
    };

    count = (goodsReceiptPOSearchEntity: GoodsIssueSearchEntity): Observable<number> => {
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

    singleListRequester = (requesterSearchEntity: RequesterSearchEntity) => {
        return this.http.post<RequesterEntity[]>(
          this.apiUrl + '/single-list-requester',
          requesterSearchEntity,
          {
            observe: 'response',
            headers: this.getHeader(),
          },
        )
          .pipe(
            map(
              (response: HttpResponse<RequesterEntity[]>) => response.body,
            ),
          );
      };

}
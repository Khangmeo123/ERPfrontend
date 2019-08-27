import { Repository } from 'src/app/_repositories/repository';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { GoodsReturnSearch, InventoryOrganizationOfGoodsReturnSearch, RequesterOfGoodsReturnSearch } from 'src/app/_modules/inventory/_backend/goods-return/goods-return.searchentity';
import { Observable } from 'rxjs';
import { GoodsReturn, InventoryOrganizationOfGoodsReturn, RequesterOfGoodsReturn } from 'src/app/_modules/inventory/_backend/goods-return/goods-return.entity';
import { EnumEntity } from 'src/app/_helpers/entity';

@Injectable({
    providedIn: 'root',
})

export class GoodsReturnRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/issue/goods-return/goods-return-list';
    }

    getList = (goodsReturnSearchEntity: GoodsReturnSearch): Observable<GoodsReturn[]> => {
        return this.http.post<GoodsReturn[]>(
            this.apiUrl + '/list',
            goodsReturnSearchEntity,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    (response: HttpResponse<GoodsReturn[]>) => response.body,
                ),
            );
    };

    count = (goodsReturnSearchEntity: GoodsReturnSearch): Observable<number> => {
        return this.http.post<number>(
            this.apiUrl + '/count',
            goodsReturnSearchEntity,
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

    singleListInventoryOrganization = (inventoryOrganizationSearchEntity: InventoryOrganizationOfGoodsReturnSearch) => {
        return this.http.post<InventoryOrganizationOfGoodsReturn[]>(
            this.apiUrl + '/single-list-inventory-organization',
            inventoryOrganizationSearchEntity,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    (response: HttpResponse<InventoryOrganizationOfGoodsReturn[]>) => response.body,
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

    singleListRequester = (requesterSearchEntity: RequesterOfGoodsReturnSearch) => {
        return this.http.post<RequesterOfGoodsReturn[]>(
            this.apiUrl + '/single-list-requester',
            requesterSearchEntity,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    (response: HttpResponse<RequesterOfGoodsReturn[]>) => response.body,
                ),
            );
    };

}
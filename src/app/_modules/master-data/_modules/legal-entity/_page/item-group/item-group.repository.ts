import { ItemSearchEntity } from 'src/app/_modules/master-data/_backend/item/item.searchentity';
import { Entities } from './../../../../../../_helpers/entity';
import { ItemEntity } from 'src/app/_modules/master-data/_backend/item/item.entity';
import { LegalSearchEntity } from './../../../../_backend/legal/legal.searchentity';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SobSearchEntity } from 'src/app/_modules/master-data/_backend/sob/sob.searchentity';
import { ItemGroupEntity } from 'src/app/_modules/master-data/_backend/item-group/item-group.entity';
import { ItemGroupSearchEntity } from 'src/app/_modules/master-data/_backend/item-group/item-group.searchentity';

@Injectable({
    providedIn: 'root',
})

export class ItemGroupRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/legal-entity/item-group';
    }

    dropDownLegalList(legalSearchEntity: LegalSearchEntity): Observable<Entities> {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-legal-entity', JSON.stringify(legalSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new ItemEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new ItemEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    getItemGroupsListFromLegal(itemGroupSearchEntity: ItemGroupSearchEntity): Observable<ItemGroupEntity[]> {
        return this.http.post<ItemGroupEntity[]>(this.apiUrl + '/list', JSON.stringify(itemGroupSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new ItemGroupEntity(item);
                    });
                }),
            );
    }

    getItemGroupIdFromLegal(itemGroupId: string): Observable<ItemGroupEntity> {
        return this.http.post<ItemGroupEntity>(this.apiUrl + '/get', JSON.stringify({ id: itemGroupId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new ItemGroupEntity(r.body);
                }),
            );
    }

    countItemGroupsFromLegal(itemGroupSearchEntity: ItemGroupSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(itemGroupSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }


    addItemGroupsFromLegal(itemGroupEntity: any) {
        return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(itemGroupEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    updateItemGroupsFromLegal(itemGroupEntity: any) {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(itemGroupEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    activeItemGroupsFromLegal() {

    }

    deactiveItemGroupsFromLegal() {

    }

    dropDownItemList(itemSearchEntity: ItemSearchEntity): Observable<Entities> {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-item-detail', JSON.stringify(itemSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new ItemEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new ItemEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    getItemsFromItemGroup(itemSearchEntity: ItemSearchEntity): Observable<ItemEntity[]> {
        return this.http.post<ItemEntity[]>(this.apiUrl + '/list-item-detail', JSON.stringify(itemSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new ItemEntity(item);
                    });
                }),
            );
    }

    countItemsFromItemGroup(itemSearchEntity: ItemSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count-item-detail', JSON.stringify(itemSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    addItemsToItemGroup(itemIds: string[], itemGroupId: string): Observable<any> {
        return this.http.post<any>(this.apiUrl + '/bulk-create-item-detail', JSON.stringify({
            itemGroupingId: itemGroupId,
            itemDetailIds: itemIds,
        }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    deleteItemFromItemGroup(itemId: string, itemGroupId: string) {
        return this.http.post<any>(this.apiUrl + '/delete-item-detail', JSON.stringify({
            itemGroupingId: itemGroupId,
            itemDetailId: itemId,
        }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }
}

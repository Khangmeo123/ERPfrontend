import { ItemSearchEntity } from 'src/app/_modules/master-data/_backend/item/item.searchentity';
import { Entities } from './../../../../../../_helpers/entity';
import { ItemEntity } from 'src/app/_modules/master-data/_backend/item/item.entity';
import { LegalSearchEntity } from './../../../../_backend/legal/legal.searchentity';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SobSearchEntity } from 'src/app/_modules/master-data/_backend/sob/sob.searchentity';

@Injectable({
    providedIn: 'root',
})

export class ItemOfLegalEntityRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/legal-entity/item-of-legal-entity';
    }

    getLegalList(legalSearchEntity: LegalSearchEntity): Observable<LegalEntity[]> {
        return this.http.post<LegalEntity[]>(this.apiUrl + '/list-legal-entity', JSON.stringify(legalSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new LegalEntity(item);
                    });
                }),
            );
    }

    countlegal(legalSearchEntity: LegalSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count-legal-entity', JSON.stringify(legalSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getItemsFromLegal(itemSearchEntity: ItemSearchEntity): Observable<ItemEntity[]> {
        return this.http.post<ItemEntity[]>(this.apiUrl + '/list-item-detail', JSON.stringify(itemSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new ItemEntity(item);
                    });
                }),
            );
    }

    countItemsFromLegal(itemSearchEntity: ItemSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count-item-detail', JSON.stringify(itemSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
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

    addItemsToLegal(itemIds: string[], legalId: string): Observable<any> {
        return this.http.post<any>(this.apiUrl + '/create-item-detail', JSON.stringify({ legalEntityId: legalId, ids: itemIds }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    deactivateItemFromLegal() {

    }

    importItemsToLegal() {

    }

    exportItemsFromLegal() {

    }

    dropDownSobList(sobSearchEntity: SobSearchEntity): Observable<Entities> {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-sob', JSON.stringify(sobSearchEntity),
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
}

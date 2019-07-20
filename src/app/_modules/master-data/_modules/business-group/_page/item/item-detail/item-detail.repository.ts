import { UomSearchEntity } from 'src/app/_modules/master-data/_backend/uom/uom.searchentity';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { ItemEntity } from 'src/app/_modules/master-data/_backend/item/item.entity';
import { ItemSearchEntity } from 'src/app/_modules/master-data/_backend/item/item.searchentity';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EnumEntity, Entities } from 'src/app/_helpers/entity';
import { UomEntity } from 'src/app/_modules/master-data/_backend/uom/uom.entity';

@Injectable({
    providedIn: 'root',
})
export class ItemDetailRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/business-group/item/item-detail';
    }

    getId(itemId: string): Observable<ItemEntity> {
        return this.http.post<ItemEntity>(this.apiUrl + '/get', JSON.stringify({ Id: itemId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new ItemEntity(r.body);
                }),
            );
    }


    add(itemEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(itemEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    update(itemEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(itemEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    delete(itemEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(itemEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getUomList(uomSearchEntity: UomSearchEntity): Observable<Entities> {
        return this.http.post<Entities>(this.apiUrl + '/uom/list', JSON.stringify(uomSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new UomEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new UomEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    getStatusList(): Observable<EnumEntity[]> {
        return this.http.post<EnumEntity[]>(this.apiUrl + '/status/list', JSON.stringify({}),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }
}
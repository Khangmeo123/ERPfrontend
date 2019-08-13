import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { AssetEntity } from 'src/app/_modules/master-data/_backend/asset/asset.entity';
import { AssetSearchEntity } from 'src/app/_modules/master-data/_backend/asset/asset.searchentity';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EnumEntity } from 'src/app/_helpers/entity';

@Injectable({
    providedIn: 'root',
})
export class AssetRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/business-group/asset';
    }

    getList(assetSearchEntity: AssetSearchEntity): Observable<AssetEntity[]> {
        return this.http.post<AssetEntity[]>(this.apiUrl + '/list', JSON.stringify(assetSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new AssetEntity(item);
                    });
                }),
            );
    }

    count(assetSearchEntity: AssetSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(assetSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getId(assetId: string): Observable<AssetEntity> {
        return this.http.post<AssetEntity>(this.apiUrl + '/get', JSON.stringify({ Id: assetId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new AssetEntity(r.body);
                }),
            );
    }


    add(assetEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(assetEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    update(assetEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(assetEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    deactivate(assetEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(assetEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getTypeList(): Observable<EnumEntity[]> {
        return this.http.post<EnumEntity[]>(this.apiUrl + '/enum-list-type', JSON.stringify({}),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getStatusList(): Observable<EnumEntity[]> {
        return this.http.post<EnumEntity[]>(this.apiUrl + '/enum-list-status', JSON.stringify({}),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }
}

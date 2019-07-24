import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { UomEntity } from 'src/app/_modules/master-data/_backend/uom/uom.entity';
import { UomSearchEntity } from 'src/app/_modules/master-data/_backend/uom/uom.searchentity';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UomRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/business-group/uom';
    }

    getList(uomSearchEntity: UomSearchEntity): Observable<UomEntity[]> {
        return this.http.post<UomEntity[]>(this.apiUrl + '/list', JSON.stringify(uomSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new UomEntity(item);
                    });
                }),
            );
    }

    count(uomSearchEntity: UomSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(uomSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getId(uomId: string): Observable<UomEntity> {
        return this.http.post<UomEntity>(this.apiUrl + '/get', JSON.stringify({ Id: uomId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new UomEntity(r.body);
                }),
            );
    }


    add(uomEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(uomEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    update(uomEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(uomEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    delete(uomEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(uomEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }
}
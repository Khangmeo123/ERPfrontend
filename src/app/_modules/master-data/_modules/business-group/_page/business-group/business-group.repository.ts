import { BusinessGroupEntity } from './../../../../_backend/business-group/business-group.entity';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_repositories/repository';
import { BusinessGroupSearchEntity } from 'src/app/_modules/master-data/_backend/business-group/business-group.searchentity';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BusinessGroupRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/business-group';
    }

    getList(businessGroupSearchEntity: BusinessGroupSearchEntity): Observable<BusinessGroupEntity[]> {
        return this.http.post<BusinessGroupEntity[]>(this.apiUrl + '/list', JSON.stringify(businessGroupSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new BusinessGroupEntity(item);
                    });
                }),
            );
    }

    count(businessGroupSearchEntity: BusinessGroupSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(businessGroupSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getId(businessGroupId: string): Observable<BusinessGroupEntity> {
        return this.http.post<BusinessGroupEntity>(this.apiUrl + '/get', JSON.stringify({ Id: businessGroupId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new BusinessGroupEntity(r.body);
                }),
            );
    }


    add(businessGroupEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(businessGroupEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    update(businessGroupEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(businessGroupEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    deactivate(businessGroupEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(businessGroupEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }
}

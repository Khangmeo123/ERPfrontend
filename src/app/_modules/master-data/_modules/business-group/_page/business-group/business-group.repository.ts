import { BusinessGroupEntity } from './../../../../_backend/business-group/business-group.entity';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
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
        this.apiUrl = environment.apiUrlApps + '/business-group';
    }

    getList(businessGroupSearchEntity: BusinessGroupSearchEntity): Observable<BusinessGroupEntity[]> {
        return this.http.post<BusinessGroupEntity[]>(this.apiUrl, JSON.stringify(businessGroupSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new BusinessGroupEntity(item);
                    });
                }),
            );
    }

    getId(businessGroupId: string): Observable<BusinessGroupEntity> {
        return this.http.post<BusinessGroupEntity>(this.apiUrl, JSON.stringify({ Id: businessGroupId }),
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

    edit(businessGroupEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(businessGroupEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    delete(businessGroupId: string): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify({ Id: businessGroupId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }
}
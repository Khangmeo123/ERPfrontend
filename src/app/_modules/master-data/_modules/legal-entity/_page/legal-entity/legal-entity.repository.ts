import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LegalSearchEntity } from './../../../../_backend/legal/legal.searchentity';
import { Observable } from 'rxjs';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { map } from 'rxjs/operators';
import { Entities } from 'src/app/_helpers/entity';

@Injectable({
    providedIn: 'root',
})

export class LegalEntityRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/legal-entity';
    }


    getList(legalSearchEntity: LegalSearchEntity): Observable<LegalEntity[]> {
        return this.http.post<LegalEntity[]>(this.apiUrl + '/List', JSON.stringify(legalSearchEntity),
        { observe: 'response', headers: this.getHeader() }).pipe(
            map(r => {
                return r.body.map((item) => {
                    return new LegalEntity(item);
                });
            }),
        );
    }

    count(legalSearchEntity: LegalSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/Count', JSON.stringify(legalSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getId(legalId: string): Observable<LegalEntity> {
        return this.http.post<LegalEntity>(this.apiUrl + '/Get', JSON.stringify({ Id: legalId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new LegalEntity(r.body);
                }),
            );
    }

    add(legalSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/Create', JSON.stringify(legalSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    update(legalSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/Update', JSON.stringify(legalSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    delete(legalSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/Delete', JSON.stringify(legalSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getListSobOfLegal(legalSearchEntity: LegalSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/ListSetOfBook', JSON.stringify(legalSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new LegalEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new LegalEntity(item);
                    });
                    return r.body;
                }),
            );
    }
}
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DivisionSearchEntity } from 'src/app/_modules/master-data/_backend/division/division.searchentity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { Entities } from 'src/app/_helpers/entity';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { DivisionEntity } from 'src/app/_modules/master-data/_backend/division/division.entity';

@Injectable({
    providedIn: 'root',
})


export class DivisionRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/division';
    }


    getList(divisionSearchEntity: DivisionSearchEntity): Observable<DivisionEntity[]> {
        return this.http.post<DivisionEntity[]>(this.apiUrl + '/list', JSON.stringify(divisionSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new DivisionEntity(item);
                    });
                }),
            );
    }

    count(divisionSearchEntity: DivisionSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(divisionSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getId(divisionId: string): Observable<DivisionEntity> {
        return this.http.post<DivisionEntity>(this.apiUrl + '/get', JSON.stringify({ Id: divisionId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new DivisionEntity(r.body);
                }),
            );
    }


    add(divisionEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(divisionEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    update(divisionEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(divisionEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    active(divisionEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/active', JSON.stringify(divisionEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    deactive(divisionEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/deactive', JSON.stringify(divisionEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getListLegalEntityDrop(legalSearchEntity: LegalSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/list-legal-entity', JSON.stringify(legalSearchEntity),
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
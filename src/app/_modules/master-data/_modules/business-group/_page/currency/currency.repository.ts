import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { CurrencyEntity } from 'src/app/_modules/master-data/_backend/currency/currency.entity';
import { CurrencySearchEntity } from 'src/app/_modules/master-data/_backend/currency/currency.searchentity';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CurrencyRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/business-group/currency';
    }

    getList(currencySearchEntity: CurrencySearchEntity): Observable<CurrencyEntity[]> {
        return this.http.post<CurrencyEntity[]>(this.apiUrl + '/list', JSON.stringify(currencySearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new CurrencyEntity(item);
                    });
                }),
            );
    }

    count(currencySearchEntity: CurrencySearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(currencySearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getId(currencyId: string): Observable<CurrencyEntity> {
        return this.http.post<CurrencyEntity>(this.apiUrl + '/get', JSON.stringify({ Id: currencyId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new CurrencyEntity(r.body);
                }),
            );
    }


    add(currencyEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(currencyEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    update(currencyEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(currencyEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    delete(currencyEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(currencyEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }
}
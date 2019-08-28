import { Repository } from 'src/app/_repositories/repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Return } from 'src/app/_modules/inventory/_backend/return/return.entity';

@Injectable({
    providedIn: 'root',
})

export class ReturnDetailRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlInv + 'inventory/receipt/return/return-detail';
    }

    getDetail = (id: string): Observable<Return> => {
        return this.http.post(
            this.apiUrl + '/get',
            {
                id,
            },
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(r => new Return(r.body)),
            );
    };

    save = (returnEntity: Return): Observable<Return> => {
        return this.http.post<Return>(
            this.apiUrl + '/save',
            returnEntity,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    r => new Return(r.body),
                ),
            );
    };

    send = (returnEntity: Return): Observable<Return> => {
        return this.http.post<Return>(
            this.apiUrl + '/send',
            returnEntity,
            {
                observe: 'response',
                headers: this.getHeader(),
            },
        )
            .pipe(
                map(
                    r => new Return(r.body),
                ),
            );
    };
}
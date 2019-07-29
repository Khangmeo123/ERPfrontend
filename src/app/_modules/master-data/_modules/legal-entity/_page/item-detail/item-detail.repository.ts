import { Entities } from './../../../../../../_helpers/entity';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LegalItemDetailEntity } from 'src/app/_modules/master-data/_backend/legal-item-detail/legal-item-detail.entity';

@Injectable({
    providedIn: 'root',
})

export class LegalItemDetailRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/legal-entity/item-detail';
    }

    getItemDetail(itemDetailId: string): Observable<LegalItemDetailEntity> {
        return this.http.post<LegalItemDetailEntity>(this.apiUrl + '/get', JSON.stringify({ id: itemDetailId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new LegalItemDetailEntity(r.body);
                }),
            );
    }


}

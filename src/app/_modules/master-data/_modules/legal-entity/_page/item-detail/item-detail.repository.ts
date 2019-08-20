import { ItemSearchEntity } from 'src/app/_modules/master-data/_backend/item/item.searchentity';
import { UomEntity } from './../../../../_backend/uom/uom.entity';
import { UomSearchEntity } from './../../../../_backend/uom/uom.searchentity';
import { CoaEntity } from './../../../../_backend/coa/coa.entity';
import { CoaSearchEntity } from './../../../../_backend/coa/coa.searchentity';
import { Entities, EnumEntity } from '../../../../../../_helpers/entity';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_repositories/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LegalItemDetailEntity } from 'src/app/_modules/master-data/_backend/legal-item-detail/legal-item-detail.entity';
import { ItemEntity } from 'src/app/_modules/master-data/_backend/item/item.entity';

@Injectable({
    providedIn: 'root',
})

export class LegalItemDetailRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/legal-entity/item-detail';
    }

    getLegalItemDetail(itemDetailId: string): Observable<LegalItemDetailEntity> {
        return this.http.post<LegalItemDetailEntity>(this.apiUrl + '/get', JSON.stringify({ itemDetailId: itemDetailId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new LegalItemDetailEntity(r.body);
                }),
            );
    }

    updateLegalItemDetail(legalItemDetailEntity: any): Observable<LegalItemDetailEntity> {
        return this.http.post<LegalItemDetailEntity>(this.apiUrl + '/update', JSON.stringify(legalItemDetailEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => new LegalItemDetailEntity(r.body)),
            );
    }

    dropDownCoa(coaSearchEntity: CoaSearchEntity): Observable<Entities> {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-chart-of-account', JSON.stringify(coaSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new CoaEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new CoaEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    dropDownUom(uomSearchEntity: UomSearchEntity): Observable<Entities> {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-unit-of-measure', JSON.stringify(uomSearchEntity),
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

    dropDownItemList(itemSearchEntity: ItemSearchEntity): Observable<Entities> {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-item', JSON.stringify(itemSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new ItemEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new ItemEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    dropdownDiscountType(): Observable<EnumEntity[]> {
        return this.http.post<EnumEntity[]>(this.apiUrl + '/list-discount-type', JSON.stringify({}),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }
}

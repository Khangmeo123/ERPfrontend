import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_repositories/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeDetailOfLegalEntity } from 'src/app/_modules/master-data/_backend/legal-employee-detail/legal-employee-detail.entity';
import { ProvinceSearchEntity } from 'src/app/_modules/master-data/_backend/province/province.searchentity';
import { Entities } from 'src/app/_helpers/entity';
import { ProvinceEntity } from 'src/app/_modules/master-data/_backend/province/province.entity';
import { BankSearchEntity } from 'src/app/_modules/master-data/_backend/bank/bank.searchentity';
import { BankEntity } from 'src/app/_modules/master-data/_backend/bank/bank.entity';

@Injectable({
    providedIn: 'root',
})


export class EmployeeOfLegalEntityDetailRepository extends Repository{
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/legal-entity/employee-detail';
    }

    getId(employeeId: string): Observable<EmployeeDetailOfLegalEntity> {
        return this.http.post<EmployeeDetailOfLegalEntity>(this.apiUrl + '/get', JSON.stringify({ Id: employeeId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new EmployeeDetailOfLegalEntity(r.body);
                }),
            );
    }

    getListProvince(provinceSearchEntity: ProvinceSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-province', JSON.stringify(provinceSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new ProvinceEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new ProvinceEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    getListBank(bankSearchEntity: BankSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-bank', JSON.stringify(bankSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new BankEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new BankEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    update(employeeEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(employeeEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

}

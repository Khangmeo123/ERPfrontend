import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_repositories/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';
import { Entities } from 'src/app/_helpers/entity';
import { EmployeeEntity } from 'src/app/_modules/master-data/_backend/employee/employee.entity';

@Injectable({
    providedIn: 'root',
})


export class EmployeeOfLegalEntityRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/legal-entity/employee-of-legal-entity';
    }

    getListLegal(legalSearchEntity: LegalSearchEntity): Observable<LegalEntity[]> {
        return this.http.post<LegalEntity[]>(this.apiUrl + '/list-legal-entity', JSON.stringify(legalSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new LegalEntity(item);
                    });
                }),
            );
    }

    countlegal(legalSearchEntity: LegalSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count-legal-entity', JSON.stringify(legalSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getListEmployeeDrop(employeeSearchEntity: EmployeeSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-employee', JSON.stringify(employeeSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new EmployeeEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new EmployeeEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    getListEmployee(employeeSearchEntity: EmployeeSearchEntity): Observable<EmployeeEntity[]> {
        return this.http.post<LegalEntity[]>(this.apiUrl + '/list-employee-detail', JSON.stringify(employeeSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new EmployeeEntity(item);
                    });
                }),
            );
    }

    countEmployee(employeeSearchEntity: EmployeeSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count-employee-detail', JSON.stringify(employeeSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    addEmployee(employeeSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/bulk-add-employee-detail', JSON.stringify(employeeSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    deleteEmployeeFormLegal(employeeSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/delete-employee-detail', JSON.stringify(employeeSearchEntity),
        { observe: 'response', headers: this.getHeader() }).pipe(
            map(r => r.body),
        );
    }
}

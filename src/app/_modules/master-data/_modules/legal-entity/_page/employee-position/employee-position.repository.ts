import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EmployeePositionSearchEntity } from 'src/app/_modules/master-data/_backend/employee-position/employee-position.searchentity';
import { CustomerGroupEntity } from 'src/app/_modules/master-data/_backend/customer-group/customer-group.entity';
import { map } from 'rxjs/operators';
import { EmployeePositionEntity } from 'src/app/_modules/master-data/_backend/employee-position/employee-position.entity';
import { Observable } from 'rxjs';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';
import { EmployeeEntity } from 'src/app/_modules/master-data/_backend/employee/employee.entity';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { Entities } from 'src/app/_helpers/entity';

@Injectable({
    providedIn: 'root',
})

export class EmployeePositionRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/legal-entity/employee-position';
    }

    getListEmployeePosition(employeePositionSearchEntity: EmployeePositionSearchEntity): Observable<EmployeePositionEntity[]> {
        return this.http.post<CustomerGroupEntity[]>(this.apiUrl + '/list-position', JSON.stringify(employeePositionSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new EmployeePositionEntity(item);
                    });
                }),
            );
    }

    countEmployeePosition(employeePositionSearchEntity: EmployeePositionSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count-position', JSON.stringify(employeePositionSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getId(employeePositionId: string): Observable<EmployeePositionEntity> {
        return this.http.post<EmployeePositionEntity>(this.apiUrl + '/get-position', JSON.stringify({ Id: employeePositionId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new EmployeePositionEntity(r.body);
                }),
            );
    }

    add(employeePositionSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/create-position', JSON.stringify(employeePositionSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    update(employeePositionSearchEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update-position', JSON.stringify(employeePositionSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getListEmployeeDetail(employeeSearchEntity: EmployeeSearchEntity): Observable<EmployeeEntity[]> {
        return this.http.post<EmployeeEntity[]>(this.apiUrl + '/list-employee-detail', JSON.stringify(employeeSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new EmployeeEntity(item);
                    });
                }),
            );
    }

    countEmployeeDetail(employeeSearchEntity: EmployeeSearchEntity): Observable<number> {
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

    getListLegalEntity(legalSearchEntity: LegalSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-legal-entity', JSON.stringify(legalSearchEntity),
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

    getDropListEmployee(employeeSearchEntity: EmployeeSearchEntity) {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-employee-detail', JSON.stringify(employeeSearchEntity),
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

}
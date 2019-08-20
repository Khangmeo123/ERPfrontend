import { JobTitleEntity } from 'src/app/_modules/master-data/_backend/job-title/job-title.entity';
import { EnumEntity, Entities } from '../../../../../../../_helpers/entity';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_repositories/repository';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EmployeeEntity } from 'src/app/_modules/master-data/_backend/employee/employee.entity';
import { map } from 'rxjs/operators';
import { JobTitleSearchEntity } from 'src/app/_modules/master-data/_backend/job-title/job-title.searchentity';
import { JobLevelSearchEntity } from 'src/app/_modules/master-data/_backend/job-level/job-level.searchentity';
import { JobLevelEntity } from 'src/app/_modules/master-data/_backend/job-level/job-level.entity';

@Injectable({
    providedIn: 'root',
})
export class EmployeeDetailRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/business-group/employee/employee-detail';
    }

    getId(employeeId: string): Observable<EmployeeEntity> {
        return this.http.post<EmployeeEntity>(this.apiUrl + '/get', JSON.stringify({ Id: employeeId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new EmployeeEntity(r.body);
                }),
            );
    }


    add(employeeEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(employeeEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    update(employeeEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(employeeEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    deactivate(employeeEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(employeeEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getJobTitleList(jobTitleSearchEntity: JobTitleSearchEntity): Observable<Entities> {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-job-title', JSON.stringify(jobTitleSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new JobTitleEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new JobTitleEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    getJobLevelList(jobLevelSearchEntity: JobLevelSearchEntity): Observable<Entities> {
        return this.http.post<Entities>(this.apiUrl + '/drop-list-job-level', JSON.stringify(jobLevelSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    r.body.ids = r.body.ids.map(item => {
                        return new JobLevelEntity(item);
                    });
                    r.body.exceptIds = r.body.exceptIds.map(item => {
                        return new JobLevelEntity(item);
                    });
                    return r.body;
                }),
            );
    }

    getStatusList(): Observable<EnumEntity[]> {
        return this.http.post<EnumEntity[]>(this.apiUrl + '/enum-list-status', JSON.stringify({}),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }
}

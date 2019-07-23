import { JobTitleSearchEntity } from 'src/app/_modules/master-data/_backend/job-title/job-title.searchentity';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { JobLevelEntity } from 'src/app/_modules/master-data/_backend/job-level/job-level.entity';
import { JobLevelSearchEntity } from 'src/app/_modules/master-data/_backend/job-level/job-level.searchentity';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JobTitleEntity } from 'src/app/_modules/master-data/_backend/job-title/job-title.entity';
import { Entities } from 'src/app/_helpers/entity';

@Injectable({
    providedIn: 'root',
})
export class JobLevelRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/business-group/job-level';
    }

    getList(jobLevelSearchEntity: JobLevelSearchEntity): Observable<JobLevelEntity[]> {
        return this.http.post<JobLevelEntity[]>(this.apiUrl + '/list', JSON.stringify(jobLevelSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new JobLevelEntity(item);
                    });
                }),
            );
    }

    count(jobLevelSearchEntity: JobLevelSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(jobLevelSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getId(jobLevelId: string): Observable<JobLevelEntity> {
        return this.http.post<JobLevelEntity>(this.apiUrl + '/get', JSON.stringify({ Id: jobLevelId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new JobLevelEntity(r.body);
                }),
            );
    }


    add(jobLevelEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(jobLevelEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    update(jobLevelEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(jobLevelEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    delete(jobLevelEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(jobLevelEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }
}
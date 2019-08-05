import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { Observable } from 'rxjs';
import { JobTitleEntity } from 'src/app/_modules/master-data/_backend/job-title/job-title.entity';
import { JobTitleSearchEntity } from 'src/app/_modules/master-data/_backend/job-title/job-title.searchentity';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class JobTitleRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
        this.apiUrl = environment.apiUrlApps + 'master-data/business-group/job-title';
    }

    getList(jobTitleSearchEntity: JobTitleSearchEntity): Observable<JobTitleEntity[]> {
        return this.http.post<JobTitleEntity[]>(this.apiUrl + '/list', JSON.stringify(jobTitleSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return r.body.map((item) => {
                        return new JobTitleEntity(item);
                    });
                }),
            );
    }

    count(jobTitleSearchEntity: JobTitleSearchEntity): Observable<number> {
        return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(jobTitleSearchEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    getId(jobTitleId: string): Observable<JobTitleEntity> {
        return this.http.post<JobTitleEntity>(this.apiUrl + '/get', JSON.stringify({ Id: jobTitleId }),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => {
                    return new JobTitleEntity(r.body);
                }),
            );
    }


    add(jobTitleEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(jobTitleEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    update(jobTitleEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(jobTitleEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }

    delete(jobTitleEntity: any): Observable<boolean> {
        return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(jobTitleEntity),
            { observe: 'response', headers: this.getHeader() }).pipe(
                map(r => r.body),
            );
    }
}
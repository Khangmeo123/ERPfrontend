import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';

@Injectable({
    providedIn: 'root',
})
export class DetailEmployeeRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
    }
}
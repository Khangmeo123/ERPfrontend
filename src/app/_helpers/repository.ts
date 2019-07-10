import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class Repository {
    public apiUrl: string;
    constructor(public http: HttpClient) { }

    getHeader(): HttpHeaders {
        const headers = new HttpHeaders({ 'content-type': 'application/json; charset=utf8' });
        return headers;
    }

}

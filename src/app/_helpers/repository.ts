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

    toCamel(o): any {
        let newO;
        let origKey;
        let newKey;
        let value;
        if (o instanceof Array) {
            return o.map((value) => {
                if (typeof value === 'object') {
                    value = this.toCamel(value);
                }
                return value;
            });
        } else {
            newO = {};
            for (origKey in o) {
                if (o.hasOwnProperty(origKey)) {
                    newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString();
                    value = o[origKey];
                    if (value instanceof Array || (value !== null && value.constructor === Object)) {
                        value = this.toCamel(value);
                    }
                    newO[newKey] = value;
                }
            }
        }
        return newO;
    }
}

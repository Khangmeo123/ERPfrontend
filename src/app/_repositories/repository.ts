import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Repository {
  public apiUrl: string;

  constructor(public http: HttpClient) {
  }

  getHeader(): HttpHeaders {
    return new HttpHeaders({'content-type': 'application/json; charset=utf8'});
  }

  downLoadFile(data: any, typeApplication: string) {
    const blob = new Blob([data], {type: typeApplication});
    const url = window.URL.createObjectURL(blob);
    const pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
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

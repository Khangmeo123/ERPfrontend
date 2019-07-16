import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxZWMwZGI5OS05NmFhLTRiODYtYjRhOS03ZjZiNWNkN2Y1YmQiLCJ1bmlxdWVfbmFtZSI6Imh1eWJxIiwibmJmIjoxNTYyNTcxNzQ2LCJleHAiOjE1NzI1NzE3NDUsImlhdCI6MTU2MjU3MTc0Nn0.By4ka9gieQAaFIKLBg8G7itp6Z379hG400lx0QsDhD8"
    });
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string): Observable<any> {
        return new Observable(observer => {
            this.currentUserSubject.next('logged');
            observer.next({ username: username, password: password })
        })
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
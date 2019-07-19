import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>({
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI1N2JmMDE5OC1mMTA2LTQ1MGQtYmM1ZS1mMWY2NDUyZmRjNDciLCJ1bmlxdWVfbmFtZSI6Imh1eWJxIiwiQnVzaW5lc3NHcm91cElkIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiwiSXNTdXBlckFkbWluIjoiVHJ1ZSIsIm5iZiI6MTU2MzE1OTc0NiwiZXhwIjoxNTczMTU5NzQ1LCJpYXQiOjE1NjMxNTk3NDZ9.9ll68DtTqe0Rs43Pm7jHRJiYNuUCiEGnnC6trMAGt4Q"
        });
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

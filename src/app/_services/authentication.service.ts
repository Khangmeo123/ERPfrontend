import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserEntity } from '../_entities/user/user.entity';
import { AuthenticationRepository } from '../_repositories/authentication.repository';
import { ToastrService } from 'ngx-toastr';
import { translate } from '../_helpers/string';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public currentUser: Observable<any>;

  private currentUserSubject: BehaviorSubject<any>;

  constructor(
    private http: HttpClient,
    private authenticationRepository: AuthenticationRepository,
    private toastrService: ToastrService,
    private router: Router,
    private cookieService: CookieService,
  ) {
    const user: UserEntity = JSON.parse(localStorage.getItem('currentUser')) || null;
    if (user === null) {
      this.currentUserSubject = new BehaviorSubject<any>(null);
    } else {
      this.currentUserSubject = new BehaviorSubject<any>(user);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Promise<UserEntity> {
    return new Promise<UserEntity>((resolve, reject) => {
      this.authenticationRepository.login(username, password)
        .subscribe(
          (user: UserEntity) => {
            this.currentUserSubject.next(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            resolve(user);
          },
          (error: Error) => {
            reject(error);
            this.toastrService.error(translate('login.failed'));
          },
        );
    });
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this.cookieService.deleteAll('/');
    return this.router.navigate(['login']);
  }
}

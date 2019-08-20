import { Repository } from './repository';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { UserEntity } from '../_helpers/entity';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationRepository extends Repository {
  public baseUrl: string = environment.apiUrlAuthentication;

  public login(username: string, password: string): Observable<UserEntity> {
    return this.http.post<UserEntity>(
      `${this.baseUrl}login`,
      {
        username,
        password,
      },
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<UserEntity>) => response.body,
        ),
      );
  }
}

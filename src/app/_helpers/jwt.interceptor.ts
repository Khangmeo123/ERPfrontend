import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from '../_services';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  public legalEntityId: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private authenticationService: AuthenticationService,
    private translateService: TranslateService,
  ) {
  }

  static get legalEntityId() {
    return localStorage.getItem('legalEntityId');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentLang = this.translateService.currentLang;
    // add authorization header with jwt token if available
    request = request.clone({
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Language': currentLang ? currentLang : 'vi',
        'X-LegalEntity': JwtInterceptor.legalEntityId,
      }),
    });
    return next.handle(request);
  }
}

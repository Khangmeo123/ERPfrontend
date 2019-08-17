import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public legalEntityId: string = null;

  constructor(
    private authenticationService: AuthenticationService,
    private translateService: TranslateService,
  ) {
  }

  getLegalEntityId() {
    const legalEntity = JSON.parse(localStorage.getItem('legalEntity'));
    return legalEntity.id || null;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentLang = this.translateService.currentLang;
    // add authorization header with jwt token if available
    request = request.clone({
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-LegalEntity': this.getLegalEntityId(),
        'X-Language': currentLang ? currentLang : 'vi',
      }),
    });
    return next.handle(request);
  }
}

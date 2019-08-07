import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private translateService: TranslateService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    request = request.clone({
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-BusinessGroup': 'AE0E3884-FB32-4DA1-9A51-BE6E80402A67',
        'X-LegalEntity': '',
      }),
    });
    return next.handle(request);
  }
}

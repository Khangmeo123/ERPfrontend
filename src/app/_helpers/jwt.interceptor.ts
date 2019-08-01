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
        Authentication: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI1N2JmMDE5OC1mMTA2LTQ1MGQtYmM1ZS1mMWY2NDUyZmRjNDciLCJ1bmlxdWVfbmFtZSI6Imh1eWJxIiwiQnVzaW5lc3NHcm91cElkIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiwiSXNTdXBlckFkbWluIjoiVHJ1ZSIsIm5iZiI6MTU2MzE1OTc0NiwiZXhwIjoxNTczMTU5NzQ1LCJpYXQiOjE1NjMxNTk3NDZ9.9ll68DtTqe0Rs43Pm7jHRJiYNuUCiEGnnC6trMAGt4Q',
      }),
    });
    return next.handle(request);
  }
}

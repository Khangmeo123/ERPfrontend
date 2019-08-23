import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private translateService: TranslateService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentLang = this.translateService.currentLang;
    // add authorization header with jwt token if available
    request = request.clone({
      withCredentials: true,
      headers: request.headers
        .set('X-LegalEntity', localStorage.getItem('legalEntityId') || '')
        .set('X-Language', currentLang || 'vi'),
    });
    return next.handle(request);
  }
}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, finalize } from 'rxjs/operators';
import { AuthenticationService, SpinnerService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private spinnerService: SpinnerService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        delay(500),
        finalize(
          () => this.spinnerService.hide()),
        catchError((error) => {
          if (error.status === 401) {
            this.authenticationService.logout();
          }
          return throwError(error);
        }),
      );
  }
}

import { Repository } from 'src/app/_helpers/repository';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, delay } from 'rxjs/operators';
import { AuthenticationService, SpinnerService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
        private spinnerService: SpinnerService, private Repository: Repository) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.show();
        return next.handle(request).pipe(
            delay(500),
            finalize(() => this.spinnerService.hide()),
            catchError(err => {
                this.spinnerService.hide();
                if (err.status === 401) {
                    // auto logout if 401 response returned from api
                    this.authenticationService.logout();
                    location.reload(true);
                }
                err.error = this.Repository.toCamel(err.error);
                return throwError(err.error);
            }))
    }
}
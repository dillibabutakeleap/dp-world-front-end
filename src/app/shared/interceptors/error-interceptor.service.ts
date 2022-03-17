import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/components/auth/auth.service';
import { DashboardService } from 'src/app/components/dashboard/dashboard.service';
import { AlertService } from '../alert/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
        setTimeout(() => this.spinner.hide(), 100);
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          sessionStorage.clear();
          localStorage.clear();
          this.alertService.error('Session Expired. Please login again');
          this.authService.logout();
          setTimeout(() => this.router.navigate(['/login']), 1000);
        } else if (err.status === 403) {
          // auto logout if 401 response returned from api
          sessionStorage.clear();
          localStorage.clear();
          this.alertService.error('Unauthorized');
          this.authService.logout();
          setTimeout(() => this.router.navigate(['/login']), 1000);
        }
        return throwError(err);
      })
    );
  }
}

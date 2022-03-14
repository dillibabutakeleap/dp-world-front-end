import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { apiConfig } from 'src/api.config';
import { CommonService } from 'src/app/shared/services/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CommonService {
  API_END_POINT: string;
  constructor(private httpClient: HttpClient) {
    super();
    this.API_END_POINT = environment.backendUrl;
  }

  login(payload: any) {
    return this.httpClient
      .post(`${this.API_END_POINT}${apiConfig.auth.login}`, payload)
      .pipe(
        map((res: any) => res),
        catchError((err: any) => {
          return throwError(err.error);
        })
      );
  }
  logout() {
    return this.httpClient
      .post(`${this.API_END_POINT}${apiConfig.auth.logout}`, {})
      .pipe(
        map((res: any) => res),
        catchError((err: any) => {
          return throwError(err.error);
        })
      );
  }
  registerUser(formValue: any) {
    return this.httpClient
      .post(`${this.API_END_POINT}${apiConfig.auth.register}`, formValue)
      .pipe(
        map((res: any) => res),
        catchError((err: any) => {
          return throwError(err.error);
        })
      );
  }

  resetPassword(payload: any) {
    return this.httpClient
      .post(`${this.API_END_POINT}${apiConfig.auth.resetPassword}`, payload)
      .pipe(
        map((res: any) => res),
        catchError((err: any) => {
          return throwError(err.error);
        })
      );
  }
  forgotPassword(payload: any) {
    return this.httpClient
    .post(`${this.API_END_POINT}${apiConfig.auth.forgotPassword}`, payload)
    .pipe(
      map((res: any) => res),
      catchError((err: any) => {
        return throwError(err.error);
      })
    );
  }
}

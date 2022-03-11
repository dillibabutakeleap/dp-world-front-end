import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { apiConfig } from 'src/api.config';
import { CommonService } from 'src/app/shared/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CommonService {
 
  API_ENDPOINT: string;
  constructor(private httpClient: HttpClient) {
    super();
    this.API_ENDPOINT = environment.api_endpoint;
  }

  login(payload: any) {
    return this.httpClient
      .post(`${this.API_ENDPOINT}${apiConfig.auth.login}`, payload)
      .pipe(
        map((response) => response),
        catchError((err) => err.error)
      );
  }
  logout() {
    return this.httpClient
      .post(`${this.API_ENDPOINT}${apiConfig.auth.logout}`, {})
      .pipe(
        map((response) => response),
        catchError((err) => err.error)
      );
  }
  register(value: any) {
    return this.httpClient
    .post(`${this.API_ENDPOINT}${apiConfig.auth.register}`, value)
    .pipe(
      map((response) => response),
      catchError((err) => err.error)
    );

  }
}

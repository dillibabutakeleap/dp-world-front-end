import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { apiConfig } from 'src/api.config';
import { CommonService } from 'src/app/shared/services/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends CommonService {
  API_END_POINT: string;
  constructor(private httpClient: HttpClient) {
    super();
    this.API_END_POINT = environment.backendUrl;
  }

  getUserTeam(search: any) {
    let params = this.generateHttpParams(search);
    return this.httpClient
      .get(`${this.API_END_POINT}${apiConfig.webAdmin.userTeam}`, { params })
      .pipe(
        map((res: any) => res),
        catchError((err: any) => {
          return throwError(err.error);
        })
      );
  }
  addTeamUser(payload: any) {
    return this.httpClient
      .post(`${this.API_END_POINT}${apiConfig.webAdmin.addTeamUser}`, payload)
      .pipe(
        map((res: any) => res),
        catchError((err: any) => {
          return throwError(err.error);
        })
      );
  }
  addTrainer(payload: any) {
    return this.httpClient
      .post(`${this.API_END_POINT}${apiConfig.webAdmin.addTrainer}`, payload)
      .pipe(
        map((res: any) => res),
        catchError((err: any) => {
          return throwError(err.error);
        })
      );
  }
  loadTransferLicenseConditions() {
    return this.httpClient
      .get(
        `${this.API_END_POINT}${apiConfig.webAdmin.transferLicenseConditions}`,
        {}
      )
      .pipe(
        map((res: any) => res),
        catchError((err: any) => {
          return throwError(err.error);
        })
      );
  }
  transferLicense(payload: { teamUserId: any }) {
    return this.httpClient
      .post(
        `${this.API_END_POINT}${apiConfig.webAdmin.transferLicense}`,
        payload
      )
      .pipe(
        map((res: any) => res),
        catchError((err: any) => {
          return throwError(err.error);
        })
      );
  }

  getUserSubscriptions() {
    return this.httpClient
      .get(`${this.API_END_POINT}${apiConfig.webAdmin.userSubscriptions}`, {})
      .pipe(
        map((res: any) => res),
        catchError((err: any) => {
          return throwError(err.error);
        })
      );
  }
  getDashboardData() {
    return this.httpClient
      .get(`${this.API_END_POINT}${apiConfig.webAdmin.getDashboardData}`, {})
      .pipe(
        map((res: any) => res),
        catchError((err: any) => {
          return throwError(err.error);
        })
      );
  }

  getUserProgress(userId: string) {
    return this.httpClient
      .get(
        `${this.API_END_POINT}${apiConfig.webAdmin.user}/${userId}${apiConfig.webAdmin.progressData}`,
        {}
      )
      .pipe(
        map((res: any) => res),
        catchError((err: any) => {
          return throwError(err.error);
        })
      );
  }
  getTrainees(userId: any, search: any) {
    return this.httpClient
      .get(
        `${this.API_END_POINT}${apiConfig.trainer.trainer}/${userId}${apiConfig.trainer.trainees}`,
        {}
      )
      .pipe(
        map((res: any) => res),
        catchError((err: any) => {
          return throwError(err.error);
        })
      );
  }
  resetTrainerPassword(payload: any) {
    return this.httpClient
      .post(
        `${this.API_END_POINT}${apiConfig.webAdmin.resetTrainerPassword}`,
        payload
      )
      .pipe(
        map((res: any) => res),
        catchError((err: any) => {
          return throwError(err.error);
        })
      );
  }
}

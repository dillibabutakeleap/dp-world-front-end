import {Injectable} from '@angular/core';
import {Alert, AlertType} from '../models/alert';
import {NavigationStart, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';


@Injectable({providedIn: "root"})
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false, timeOut = 5000) {
    this.alert(AlertType.Success, message, keepAfterRouteChange);
    setTimeout(() => {
      this.clear();
    }, timeOut);
  }

  error(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Error, message, keepAfterRouteChange);
    setTimeout(() => {
      this.clear();
    }, 5000);
  }

  info(message: string, keepAfterRouteChange = false, timeOut?: number) {
    this.alert(AlertType.Info, message, keepAfterRouteChange);

    setTimeout(() => {
      this.clear();
    }, timeOut ? timeOut : 5000);
  }

  warn(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Warning, message, keepAfterRouteChange);
    setTimeout(() => {
      this.clear();
    }, 10000);

  }

  alert(type: AlertType, message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Alert>{type: type, message: message});
  }

  clear() {
    // clear alerts
    this.subject.next(null);
  }
}

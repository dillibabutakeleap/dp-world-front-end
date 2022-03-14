import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}
  generateHttpParams(obj: any) {
    let params = new HttpParams();
    for (const propName in obj) {
      const propValue = obj[propName];
      if (propValue) {
        params = params.append(propName, propValue);
      }
    }
    return params;
  }
}

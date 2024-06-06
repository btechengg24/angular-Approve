import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private deptUrl = environment.deptUrl;

  private accUrl = environment.accUrl;

  private vendorUrl = environment.vendorUrl;

  private vendoritemsUrl = environment.vendoritemsUrl;

  private requestIdUrl = environment.requestIdUrl;

  private savePoUrl = environment.savePoUrl;

  constructor(private http: HttpClient) {}

  getDeptData(params: any): Observable<any> {
    return this.http.post<any>(this.deptUrl, params);
  }

  getAccData(params: any): Observable<any> {
    return this.http.post<any>(this.accUrl, params);
  }

  getVendorData(params: any): Observable<any> {
    return this.http.post<any>(this.vendorUrl, params);
  }

  getVendorItemData(params: any): Observable<any> {
    return this.http.post<any>(this.vendoritemsUrl, params);
  }

  getRequestId(params: any): Observable<any> {
    return this.http.post<any>(this.requestIdUrl, params);
  }
  savePO(params: any): Observable<any> {
    return this.http.post<any>(this.savePoUrl, params);
  }
}

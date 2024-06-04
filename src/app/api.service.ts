import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  private apiUrl1 = environment.apiUrl1;

  private vendorUrl = environment.vendorUrl;

  private vendoritemsUrl = environment.vendoritemsUrl;

  constructor(private http: HttpClient) {}

  getDeptData(params: any): Observable<any> {
    // return this.http.post<any>(this.apiUrl, params);
    return this.http.post<any>(this.apiUrl, params);
  }

  getAccData(params: any): Observable<any> {
    return this.http.post<any>(this.apiUrl1, params);
  }

  getVendorData(params: any): Observable<any> {
    return this.http.post<any>(this.vendorUrl, params);
  }

  getVendorItemData(params: any): Observable<any> {
    return this.http.post<any>(this.vendoritemsUrl, params);
  }
}

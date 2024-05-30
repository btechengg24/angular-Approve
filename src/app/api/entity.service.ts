import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment.development';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  constructor(
    private httpCLient: HttpClient
  ) {
  }

  public callAPI$(webMethod: string, body: any): Observable<any> {
    console.log("webMethod: ", webMethod);
    console.log("body: ", body);
    return this.httpCLient.post(
      environment.SERVER_URL + webMethod,
      body,
      this.httpApiHeader()
    );
  }

  httpApiHeader() {
    return {
      headers: { 'Content-Type': 'application/json' }
    };
  }

  public bodyFormatted(
    param1: number,
    param2: number,
    param3: string,
    param4: string,
    param5: string,
    param6: string,
    param7: any[],
    param8: string,
    param9: string,
    param10: string
  ): string {
    return JSON.stringify({
      param1: param1,
      param2: param2,
      param3: param3,
      param4: param4,
      param5: param5,
      param6: param6,
      param7: param7,
      param8: param8,
      param9: param9,
      param10: param10
    });
  }
}

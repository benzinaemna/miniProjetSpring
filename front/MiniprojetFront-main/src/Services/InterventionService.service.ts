/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const baseUrl = "http://localhost:8888/CLIENT-SERVICE/clients";

export interface param {
  PageIndex: number;
  PageSize: number;
  SortBy: string;
  SortOrder: string;
  Search: [
    {
      property: string;
      value: string;
    }
  ];
}

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});
@Injectable({
  providedIn: 'root'
})
export class InterventionServiceService {
  constructor(private http: HttpClient) {}
  getAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, { params, headers });
  }

  public get(url: string, options?: any): Observable<any> {
    return this.http.get(baseUrl, options);
  }

  public post(url: string, data: any, options?: any) {
    return this.http.post(baseUrl, data, options);
  }

  public put(url: string, data: any, options?: any) {
    return this.http.put(baseUrl, data, options);
  }

  public delete(url: string, options?: any) {
    return this.http.delete(baseUrl, options);
  }
}

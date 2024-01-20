/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from 'src/Components/Clients/Clients.component';

const baseUrl = "http://localhost:8888/CLIENT-SERVICE/clients";

export interface param {
  page: number;
  size: number;

}

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  constructor(private http: HttpClient) {}

  getAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, { params, headers });
  }

  public get( options?: any): Observable<any> {
    return this.http.get(baseUrl+'/'+ options);
  }

  public post(data: any) {
    return this.http.post(baseUrl, data);
  }

  public put( data: Client): Observable<any>  {
    return this.http.put(baseUrl+"/"+data.id, data);
  }

  public delete( options?: any) {
    return this.http.delete(baseUrl+'/'+options);
  }
}

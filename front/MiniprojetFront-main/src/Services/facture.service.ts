import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from 'src/Components/factures/factures.component';

const baseUrl = "http://localhost:8888/FACTURE-SERVICE/factures";
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
export class FactureService {
  constructor(private http: HttpClient) {}

  getAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, { params, headers });
  }

  public getforArticle(url: string, options?: any): Observable<any> {
    return this.http.get(url+'/'+ options);
  }

  public get(data: any): Observable<any> {
    return this.http.get(baseUrl+data);
  }

  public post(data: any) {
    return this.http.post(baseUrl, data);
  }

  public put( data: Facture): Observable<any>  {
    return this.http.put(baseUrl+"/"+data.id, data);
  }

  public delete( options?: any) {
    return this.http.delete(baseUrl+'/'+options);
  }
}

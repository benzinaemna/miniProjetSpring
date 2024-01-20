import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from 'src/Components/list-categories/list-categories.component';

const baseUrl = "http://localhost:8888/PRODUIT-SERVICE/categories";

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
export class CategorieService {
    constructor(private http: HttpClient) {}
  
    getAll(params?: any): Observable<any> {
      return this.http.get<any>(baseUrl, { params, headers });
    }
  
    public get( options?: any): Observable<any> {
      return this.http.get(baseUrl+'/'+ options);
    }
  
    public getforArticle(url: string, options?: any): Observable<any> {
      return this.http.get(url+'/'+ options);
    }
  
    public post(data: any) {
      return this.http.post(baseUrl, data);
    }
  
    public put( data: Categorie): Observable<any>  {
      return this.http.put(baseUrl+"/"+data.id, data);
    }
  
    public delete( options?: any) {
      return this.http.delete(baseUrl+'/'+options);
    }
  }
  
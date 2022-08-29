import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pro } from '../model/pro';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  Url= "https://portfoliopf.herokuapp.com/pro/"

  constructor(private httpClient:HttpClient) { }
  public lista():Observable<Pro[]>{
    return this.httpClient.get<Pro[]>(this.Url + 'lista');

  } 

  public detail(id:number):Observable<Pro>{
    return this.httpClient.get<Pro>(this.Url+`detail/${id}`);
  }

  public save(pro:Pro):Observable<any>{
    return this.httpClient.post<any>(this.Url + 'create',pro);
  }

  public update(id:number, pro:Pro):Observable<any>{
    return this.httpClient.put<any>(this.Url+ `update/${id}`,pro);
  }

  public delete(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.Url+`delete/${id}`)
  }
}

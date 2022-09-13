import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Edu } from '../model/edu';

@Injectable({
  providedIn: 'root'
})
export class EduServService {

  private Url = environment.apiBaseUrl+"edu/"
  
  constructor(private httpClient: HttpClient) { }

  public lista():Observable<Edu[]>{
    return this.httpClient.get<Edu[]>(this.Url + 'lista');

  } 

  public detail(id:number):Observable<Edu>{
    return this.httpClient.get<Edu>(this.Url+`detail/${id}`);
  }

  public save(edu:Edu):Observable<any>{
    return this.httpClient.post<any>(this.Url + 'create',edu);
  }

  public update(id:number, edu:Edu):Observable<any>{
    return this.httpClient.put<any>(this.Url+ `update/${id}`,edu);
  }

  public delete(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.Url+`delete/${id}`)
  }
}

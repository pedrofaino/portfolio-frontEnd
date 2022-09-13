import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Body } from '../model/body';

@Injectable({
  providedIn: 'root'
})
export class BodyService {
  
  private Url = environment.apiBaseUrl
  
  constructor(private httpClient: HttpClient) { }

  public lista():Observable<Body[]>{
    return this.httpClient.get<Body[]>(this.Url+'lista');
  }

  public detail(id:number):Observable<Body>{
    return this.httpClient.get<Body>(this.Url+`detail/${id}`);
  }

  public save(body:Body):Observable<any>{
    return this.httpClient.post<any>(this.Url+'create',body);
  }

  public update(id:number, body:Body):Observable<Body>{
    return this.httpClient.put<any>(this.Url+`update/${id}`,body);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../model/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaServService {

  private Url = environment.apiBaseUrl+"explab/"
  
  constructor(private httpClient: HttpClient) { 
  }

  public lista():Observable<Experiencia[]>{
    return this.httpClient.get<Experiencia[]>(this.Url+'lista');
  } 

  public detail(id:number):Observable<Experiencia>{
    return this.httpClient.get<Experiencia>(this.Url+`detail/${id}`);
  }

  public save(experiencia:Experiencia):Observable<any>{
    return this.httpClient.post<any>(this.Url + 'create',experiencia);
  }

  public update(id:number, experiencia:Experiencia):Observable<any>{
    return this.httpClient.put<any>(this.Url+ `update/${id}`,experiencia);
  }

  public delete(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.Url+`delete/${id}`)
  }

}

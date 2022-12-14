import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../model/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private Url = environment.apiBaseUrl+"skill/"

  constructor(private httpClient: HttpClient) { }
  public lista():Observable<Skill[]>{
    return this.httpClient.get<Skill[]>(this.Url+'lista');
  }
  public detail(id:number):Observable<Skill>{
    return this.httpClient.get<Skill>(this.Url+`detail/${id}`);
  }
  public save(skill:Skill):Observable<any>{
    return this.httpClient.post<any>(this.Url + 'create',skill);
  }
  public update(id:number, skill:Skill):Observable<any>{
    return this.httpClient.put<any>(this.Url+ `update/${id}`,skill);
  }
  public delete(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.Url+`delete/${id}`)
  }
}

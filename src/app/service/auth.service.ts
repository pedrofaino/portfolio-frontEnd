import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDto } from '../model/jwt-dto';
import { LoginUsuario } from '../model/login-usuario';
import { NuevoUsuario } from '../model/nuevo-usuario';
import { Configuration, ConfigurationLoader } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL= environment.apiBaseUrl+ 'auth/'

  
  constructor(private httpClient:HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario):Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'auth/nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario):Observable<JwtDto>{
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUsuario);
  }

  

}

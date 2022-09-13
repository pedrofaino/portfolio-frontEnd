import { Injectable } from '@angular/core';
import { BehaviorSubject, windowTime } from 'rxjs';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AutAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];
  isLogged = new BehaviorSubject<boolean>(false);

  constructor() { }

  public setToken(token:string):void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
    this.isLogged.next(true);
  }

  public getToken():string{
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public setUsername(userName:string):void{
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY,userName);
  }

  public getUsername():string{
    return sessionStorage.getItem(USERNAME_KEY)!;
  }

  public setAuthorities(authorities:string[]):void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY,JSON.stringify(authorities));
  }

  public getAuthorities():string[]{
    this.roles = [];
    if(sessionStorage.getItem(AUTHORITIES_KEY)!){
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach((authority:any) => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  public logOut():void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
    this.isLogged.next(null);
  }
    

}

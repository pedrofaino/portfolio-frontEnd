import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isLogged: any;


  constructor(private tokenService : TokenService) { }

  ngOnInit(): void {
    this.tokenService.isLogged.subscribe((isLogged) => {
      this.isLogged = isLogged;
    })
  }

  onLogOut():void{
    this.tokenService.logOut();
  }


}

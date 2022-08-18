import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaServService } from 'src/app/service/experiencia-serv.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss']
})
export class ExperienciaComponent implements OnInit {

  expe:Experiencia[]=[];


  constructor(private experienciaServ:ExperienciaServService, private tokenService: TokenService) { }

  isLogged=false;

  ngOnInit(): void {
    this.cargarExperiencia();
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }
  }
  cargarExperiencia():void{
    this.experienciaServ.lista().subscribe(data=>{this.expe=data});
  }

  delete(id?: number){
    if(id!=undefined){
      this.experienciaServ.delete(id).subscribe(
        data=>{
          this.cargarExperiencia();
        },err=>{
          alert("No se pudo eliminar LA EXP");
        }
      )
    }
  }
}

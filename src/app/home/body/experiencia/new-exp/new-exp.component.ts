import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaServService } from 'src/app/service/experiencia-serv.service';

@Component({
  selector: 'app-new-exp',
  templateUrl: './new-exp.component.html',
  styleUrls: ['./new-exp.component.scss']
})
export class NewExpComponent implements OnInit {

  nombreExp:string= '';
  descripcionExp:string='';

  constructor(private experienciaServ:ExperienciaServService, private router:Router) { }

  ngOnInit(): void {
  }

  onCreate():void{
    const expe = new Experiencia(this.nombreExp, this.descripcionExp);
    this.experienciaServ.save(expe).subscribe(
      data=>{
      alert("Nueva experiencia completada");
      this.router.navigate(['']);
    }, err =>{
      alert("Fallo");
      this.router.navigate(['']);
    }
    )
  }
}

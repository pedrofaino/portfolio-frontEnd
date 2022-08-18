import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaServService } from 'src/app/service/experiencia-serv.service';

@Component({
  selector: 'app-edit-exp',
  templateUrl: './edit-exp.component.html',
  styleUrls: ['./edit-exp.component.scss']
})
export class EditExpComponent implements OnInit {

  expLab : Experiencia=null;
  
  
  constructor(private experienciaServ:ExperienciaServService, private activatedRouter:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    const id=this.activatedRouter.snapshot.params['id'];
    this.experienciaServ.detail(id).subscribe(
      data=>{
        this.expLab=data;
      },err=>{
        alert("Error al modificar experiencia");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate():void{
    const id=this.activatedRouter.snapshot.params['id'];
    this.experienciaServ.update(id, this.expLab).subscribe(
      data =>{
        this.router.navigate(['']);
      },err =>{
        alert("Error al modificar experiencia2");
        this.router.navigate(['']);
    }
    )
  }

}

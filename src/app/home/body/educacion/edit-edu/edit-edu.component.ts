import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Edu } from 'src/app/model/edu';
import { EduServService } from 'src/app/service/edu-serv.service';

@Component({
  selector: 'app-edit-edu',
  templateUrl: './edit-edu.component.html',
  styleUrls: ['./edit-edu.component.scss']
})
export class EditEduComponent implements OnInit {

  edu : Edu=null;


  constructor(private eduServ:EduServService, private activatedRouter:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    const id=this.activatedRouter.snapshot.params['id'];
    this.eduServ.detail(id).subscribe(
      data=>{
        this.edu=data;
      },err=>{
        alert("Error al modificar experiencia");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate():void{
    const id=this.activatedRouter.snapshot.params['id'];
    this.eduServ.update(id, this.edu).subscribe(
      data =>{
        this.router.navigate(['']);
      },err =>{
        alert("Error al modificar experiencia2");
        this.router.navigate(['']);
    }
    )
  }

}

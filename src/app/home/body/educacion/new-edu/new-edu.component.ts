import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Edu } from 'src/app/model/edu';
import { EduServService } from 'src/app/service/edu-serv.service';

@Component({
  selector: 'app-new-edu',
  templateUrl: './new-edu.component.html',
  styleUrls: ['./new-edu.component.scss']
})
export class NewEduComponent implements OnInit {

  nombreEdu: string;
  descripcionEdu: string;

  constructor(private educacionS: EduServService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void{
    const educacion = new Edu(this.nombreEdu, this.descripcionEdu);
    this.educacionS.save(educacion).subscribe(
      data=>{
        alert("Educacion añadida correctamente");
        this.router.navigate(['']);
      }, err =>{
        alert("falló");
        this.router.navigate(['']);
      }
    )
  }

}

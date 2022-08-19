import { Component, OnInit } from '@angular/core';
import { Edu } from 'src/app/model/edu';
import { EduServService } from 'src/app/service/edu-serv.service';
import { TokenService } from 'src/app/service/token.service';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalAssignPersonDocumentComponent } from 'src/app/componentes/modal/assign-person-document-modal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.scss']
})
export class EducacionComponent implements OnInit {

  edu:Edu[]=[];
  toEditEdu:Edu;

  constructor(private eduServ:EduServService, private tokenService:TokenService, private modalService: NgbModal, private activatedRouter: ActivatedRoute, private router:Router) { }

  isLogged=false;

  ngOnInit(): void {
    this.cargarEducacion();
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }
  }
  
  cargarEducacion():void{
    this.eduServ.lista().subscribe(data=>{this.edu=data});
  }

  updateEdu(){
    this.eduServ.update(this.toEditEdu.id, this.toEditEdu).subscribe(
      data =>{
        this.router.navigate(['']);
      },err =>{
        alert("Error al modificar experiencia2");
        this.router.navigate(['']);
    }
    )
  }

  modifcarEdu(eduToUpdate: Edu){
    this.toEditEdu = eduToUpdate;
    const options: NgbModalOptions = {
      windowClass: 'document-preview-modal',
      centered: true,
      size: 'xl',
    };
    
    const modal = this.modalService.open(ModalAssignPersonDocumentComponent, options);
    modal.componentInstance.field1name = "Nombre";
    modal.componentInstance.field2name = "Descripcion";
    modal.componentInstance.field1 = this.toEditEdu.nombreEdu
    modal.componentInstance.field2 = this.toEditEdu.descripcionEdu
    modal.componentInstance.onUpdate = this.updateEdu.bind(this);
    modal.componentInstance.model = this.edu;
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toEditEdu.nombreEdu = receivedEntry;
    });
    modal.componentInstance.field2Change.subscribe((receivedEntry: any) => {
      this.toEditEdu.descripcionEdu = receivedEntry;
    });
    return modal;
  }

  delete(id?: number){
    if(id!=undefined){
      this.eduServ.delete(id).subscribe(
        data=>{
          this.cargarEducacion();
        },err=>{
          alert("No se pudo eliminar LA EXP");
        }
      )
    }
  }
}

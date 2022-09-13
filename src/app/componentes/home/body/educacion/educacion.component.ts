import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalAssignPersonDocumentComponent } from 'src/app/componentes/modals/modal/assign-person-document-modal';
import { Edu } from 'src/app/model/edu';
import { EduServService } from 'src/app/service/edu-serv.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.scss']
})
export class EducacionComponent implements OnInit {
  edu:Edu[]=[];
  toEditEdu:Edu;
  toNewEdu:Edu = {nombreEdu: "", descripcionEdu: ""};
  isLogged=false;


  constructor(private eduServ:EduServService, private tokenService:TokenService, private modalService: NgbModal, private activatedRouter: ActivatedRoute, private router:Router) { }


  ngOnInit(): void {
    this.cargarEducacion();
    this.tokenService.isLogged.subscribe((isLogged) => {
      this.isLogged = isLogged;
    })
  }
  
  cargarEducacion():void{
    this.eduServ.lista().subscribe(data=>{this.edu=data});
  }

  createEdu(){
    this.eduServ.save(this.toNewEdu).subscribe(
      data=>{
        this.router.navigate(['']);
        this.cargarEducacion();
      },err=>{
        alert('fallo');
        this.router.navigate(['']);
      }
    )
  }

  crearEdu(){
    const options: NgbModalOptions = {
      windowClass: 'document-preview-modal',
      centered: true,
      size: 'xl',
    };
    
    const modal = this.modalService.open(ModalAssignPersonDocumentComponent, options);
    modal.componentInstance.field1name = "Nombre";
    modal.componentInstance.field2name = "Descripcion";
    modal.componentInstance.butttonText = "Crear";
    modal.componentInstance.field1 = this.toNewEdu.nombreEdu;
    modal.componentInstance.field2 = this.toNewEdu.descripcionEdu;
    modal.componentInstance.buttonFunction = this.createEdu.bind(this);
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toNewEdu.nombreEdu = receivedEntry;
    });
    modal.componentInstance.field2Change.subscribe((receivedEntry: any) => {
      this.toNewEdu.descripcionEdu = receivedEntry;
    });
    return modal;
  }

  updateEdu(){
    this.eduServ.update(this.toEditEdu.id, this.toEditEdu).subscribe(
      data =>{
        this.router.navigate(['']);
      },err =>{
        alert("Error al modificar experiencia");
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
    modal.componentInstance.butttonText = "Actualizar";
    modal.componentInstance.field1 = this.toEditEdu.nombreEdu
    modal.componentInstance.field2 = this.toEditEdu.descripcionEdu
    modal.componentInstance.buttonFunction = this.updateEdu.bind(this);
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

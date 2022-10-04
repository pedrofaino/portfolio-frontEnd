import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalAssignPersonDocumentComponent } from 'src/app/componentes/modals/modal/assign-person-document-modal';
import { Pro } from 'src/app/model/pro';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {

  pro:Pro[]=[];
  toEditPro:Pro;
  toNewPro:Pro={nombreP:"", fecha:"", link:"", descripcionP:""}
  


  constructor(private proServ:ProyectosService, private tokenService:TokenService, private modalService:NgbModal, private activatedRoute:ActivatedRoute, private router:Router) { }

  isLogged=false;


  ngOnInit(): void {
    this.cargarProyecto();
    this.tokenService.isLogged.subscribe((isLogged) => {
      this.isLogged = isLogged;
    })
  }

  cargarProyecto():void{
    this.proServ.lista().subscribe(data=>{this.pro=data});
  }

  createPro(){
    this.proServ.save(this.toNewPro).subscribe(
      data=>{
        this.cargarProyecto();
        this.toNewPro = {nombreP: "", fecha:"", link:"", descripcionP: ""}
      }, err=>{
        console.log(err);
        alert('fallo' + err);
      }
    );
  }

  crearPro(){
    const options: NgbModalOptions = {
      windowClass: 'document-preview-modal',
      centered: true,
      size: 'xl',
    };
    
    const modal = this.modalService.open(ModalAssignPersonDocumentComponent, options);
    modal.componentInstance.field1name = "Nombre";
    modal.componentInstance.field2name = "Fecha";
    modal.componentInstance.field3name = "Link";
    modal.componentInstance.field4name = "Descripcion";
    modal.componentInstance.butttonText = "Crear";
    modal.componentInstance.field1 = this.toNewPro.nombreP;
    modal.componentInstance.field2 = this.toNewPro.nombreP;
    modal.componentInstance.field3 = this.toNewPro.nombreP;
    modal.componentInstance.field4 = this.toNewPro.descripcionP;
    modal.componentInstance.buttonFunction = this.createPro.bind(this);
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toNewPro.nombreP = receivedEntry;
    });
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toNewPro.fecha = receivedEntry;
    });
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toNewPro.link = receivedEntry;
    });
    modal.componentInstance.field2Change.subscribe((receivedEntry: any) => {
      this.toNewPro.descripcionP = receivedEntry;
    });
    return modal;
  }


  updatePro(){
    this.proServ.update(this.toEditPro.id, this.toEditPro).subscribe(
      data =>{
        this.router.navigate(['']);
      },err =>{
        alert("Error al modificar experiencia");
        this.router.navigate(['']);
    }
    )
  }

  modificarPro(proToUpdate: Pro){
    this.toEditPro = proToUpdate;
    const options: NgbModalOptions = {
      windowClass: 'document-preview-modal',
      centered: true,
      size: 'xl',
    };
    
    const modal = this.modalService.open(ModalAssignPersonDocumentComponent, options);
    modal.componentInstance.field1name = "Nombre";
    modal.componentInstance.field2name = "Fecha";
    modal.componentInstance.field3name = "Link";
    modal.componentInstance.field4name = "Descripcion";
    modal.componentInstance.butttonText = "Actualizar";
    modal.componentInstance.field1 = this.toEditPro.nombreP
    modal.componentInstance.field2 = this.toEditPro.fecha
    modal.componentInstance.field3 = this.toEditPro.link
    modal.componentInstance.field4 = this.toEditPro.descripcionP
    modal.componentInstance.buttonFunction = this.updatePro.bind(this);
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toEditPro.nombreP = receivedEntry;
    });
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toEditPro.fecha = receivedEntry;
    });
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toEditPro.link = receivedEntry;
    });
    modal.componentInstance.field2Change.subscribe((receivedEntry: any) => {
      this.toEditPro.descripcionP = receivedEntry;
    });
    return modal;
  }


  delete(pro: Pro){
    const id = pro.id;
    console.log('que onda', id);
    if(id!=undefined){
      this.proServ.delete(id).subscribe(
        data=>{
          this.cargarProyecto();
        },err=>{
          alert("No se pudo eliminar LA EXP");
        }
      )
    }
  }



}

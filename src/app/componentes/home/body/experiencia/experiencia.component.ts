import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalAssignPersonDocumentComponent } from 'src/app/componentes/modals/modal/assign-person-document-modal';
import { UploadFileModalComponent } from 'src/app/componentes/modals/upload-file-modal/upload-file-modal.component';
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
  toEditExp:Experiencia;
  toNewExp:Experiencia = {nombreExp: "", periodo:"", url_logo:"", descripcionExp: ""};

  constructor(private expServ:ExperienciaServService,private modalService:NgbModal, private tokenService: TokenService, private router: Router) { }

  isLogged=false;

  ngOnInit(): void {
    this.cargarExperiencia();
    this.tokenService.isLogged.subscribe((isLogged) => {
      this.isLogged = isLogged;
    })
  }

  cargarExperiencia():void{
    this.expServ.lista().subscribe(data=>{this.expe=data});
  }

  createExp(){
    this.expServ.save(this.toNewExp).subscribe(
      data=>{
        this.cargarExperiencia();
        this.toNewExp = {nombreExp: "", periodo:"", url_logo:"", descripcionExp: ""};
      },err=>{
        alert('fallo'+ err);
      }
    )
  }

  crearExp(){
    const options: NgbModalOptions = {
      windowClass: 'document-preview-modal',
      centered: true,
      size: 'xl',
    };
    
    const modal = this.modalService.open(UploadFileModalComponent, options);
    modal.componentInstance.field1name = "Nombre";
    modal.componentInstance.field2name = "Url_Logo";
    modal.componentInstance.field3name = "Periodo";
    modal.componentInstance.field4name = "Descripcion";
    modal.componentInstance.butttonText = "Crear";
    modal.componentInstance.field1 = this.toNewExp.nombreExp;
    modal.componentInstance.field2 = this.toNewExp.url_logo;
    modal.componentInstance.field3 = this.toNewExp.periodo;
    modal.componentInstance.field4 = this.toNewExp.descripcionExp;
    modal.componentInstance.buttonFunction = this.createExp.bind(this);
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toNewExp.nombreExp = receivedEntry;
    });
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toNewExp.url_logo = receivedEntry;
    });
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toNewExp.periodo = receivedEntry;
    });
    modal.componentInstance.field2Change.subscribe((receivedEntry: any) => {
      this.toNewExp.descripcionExp = receivedEntry;
    });
    return modal;
  }


  updateE(){
    this.expServ.update(this.toEditExp.id, this.toEditExp).subscribe(
      data =>{
        this.router.navigate(['']);
      },err =>{
        alert("Error al modificar experiencia");
        this.router.navigate(['']);
    }
    )
  }

  modificarExp(expToUpdate: Experiencia){
    this.toEditExp = expToUpdate;
    const options: NgbModalOptions = {
      windowClass: 'document-preview-modal',
      centered: true,
      size: 'xl',
    };
    
    const modal = this.modalService.open(UploadFileModalComponent, options);
    modal.componentInstance.field1name = "Nombre";
    modal.componentInstance.field1name = "Url Logo";
    modal.componentInstance.field1name = "Periodo";
    modal.componentInstance.field2name = "Descripcion";
    modal.componentInstance.butttonText = "Actualizar";
    modal.componentInstance.field1 = this.toEditExp.nombreExp
    modal.componentInstance.field1 = this.toEditExp.url_logo
    modal.componentInstance.field1 = this.toEditExp.periodo
    modal.componentInstance.field2 = this.toEditExp.descripcionExp
    modal.componentInstance.buttonFunction = this.updateE.bind(this);
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toEditExp.nombreExp = receivedEntry;
    });
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toEditExp.url_logo = receivedEntry;
    });
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toEditExp.periodo = receivedEntry;
    });
    modal.componentInstance.field2Change.subscribe((receivedEntry: any) => {
      this.toEditExp.descripcionExp = receivedEntry;
    });
    return modal;
  }

  delete(id?: number){
    if(id!=undefined){
      this.expServ.delete(id).subscribe(
        data=>{
          this.cargarExperiencia();
        },err=>{
          alert("No se pudo eliminar LA EXP");
        }
      )
    }
  }

}

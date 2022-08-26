import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BodyService } from 'src/app/service/body.service';
import { TokenService } from 'src/app/service/token.service';
import { Body } from 'src/app/model/body';
import { ModalAssignPersonDocumentComponent } from 'src/app/componentes/modals/modal/assign-person-document-modal';
import { UploadFileModalComponent } from 'src/app/componentes/modals/upload-file-modal/upload-file-modal.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
  

export class BodyComponent implements OnInit {

  body:Body[]=[];
  toEditBody:Body;
  toNewBody: Body = {sobreMi:"", url_foto:"", url_Foto:""};
  fileToUpload: File = null;

  constructor(private bodyServ:BodyService, 
    private modalService:NgbModal, 
    private tokenService:TokenService, 
    private router:Router, 
    private activatedRouter:ActivatedRoute
    ) { }

  isLogged=false;


  ngOnInit(): void {
    this.cargarBody();
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }
  }

  cargarBody():void{
    this.bodyServ.lista().subscribe(data=>{
      this.body = data
    });
  }

  createBody(){    
    this.bodyServ.save(this.toNewBody).subscribe(
      data=>{
        this.cargarBody();
        this.toNewBody = {sobreMi : "", url_foto : "",url_Foto:""}
      }, err=>{
        console.log(err);
        alert('fallo'+err);
      }
    )
  }

  crearBody(){
    const options: NgbModalOptions = {
      windowClass: 'document-preview-modal',
      centered: true,
      size: 'xl',
    };
    
    const modal = this.modalService.open(UploadFileModalComponent, options);
    modal.componentInstance.field1name = "Sobre mi";
    modal.componentInstance.field2name = "Foto";
    modal.componentInstance.butttonText = "Crear";
    modal.componentInstance.field1 = this.toNewBody.sobreMi;
    modal.componentInstance.field2 = this.toNewBody.url_foto;
    modal.componentInstance.buttonFunction = this.createBody.bind(this);
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toNewBody.sobreMi = receivedEntry;
    });
    modal.componentInstance.field2Change.subscribe((receivedEntry: any) => {
      this.toNewBody.url_foto = receivedEntry;
      console.log(this.toNewBody.url_foto);
    });
    return modal;
  }

  updateBody(){
    this.bodyServ.update(this.toEditBody.id, this.toEditBody).subscribe(
      data=>{
        this.router.navigate(['']);
        this.toEditBody = {sobreMi : "", url_foto : "",url_Foto:""}
      }, err=>{
        alert("Error al modificar body");
        this.router.navigate(['']);
      }
    )
  }

  modificarBody(bodyToUpdate: Body){
    this.toEditBody = bodyToUpdate;
    const options: NgbModalOptions = {
      windowClass: 'document-preview-modal',
      centered: true,
      size: 'xl',
    };
    
    const modal = this.modalService.open(UploadFileModalComponent, options);
    modal.componentInstance.field1name = "Sobre mi";
    modal.componentInstance.field2name = "Foto";
    modal.componentInstance.butttonText = "Actualizar";
    modal.componentInstance.field1 = this.toEditBody.sobreMi
    modal.componentInstance.field2 = this.toEditBody.url_foto
    modal.componentInstance.buttonFunction = this.updateBody.bind(this);
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toEditBody.sobreMi = receivedEntry;
    });
    modal.componentInstance.field2Change.subscribe((receivedEntry: any) => {
      this.toEditBody.url_foto = receivedEntry;
    });
    return modal;
  }



}

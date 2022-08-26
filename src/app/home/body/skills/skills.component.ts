import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { ModalAssignPersonDocumentComponent } from 'src/app/componentes/modals/modal/assign-person-document-modal';
import { UploadFileModalComponent } from 'src/app/componentes/modals/upload-file-modal/upload-file-modal.component';
import { Skill } from 'src/app/model/skill';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { SkillService } from 'src/app/service/skill.service';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  skill: Skill[]=[];
  toEditPro:Skill;
  toNewSkill: Skill = {nombreS:"", percent:0, url_foto:""};


  constructor(private modalService: NgbModal, private tokenService: TokenService,private skillServ:SkillService, private activatedRouteR:ActivatedRoute, private router:Router) { }

  isLogged=false;

  ngOnInit(): void {
    this.cargarSkill();
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }
  }
  cargarSkill():void{
    this.skillServ.lista().subscribe(data=>{this.skill=data});
  }

  createSkill(){
    this.skillServ.save(this.toNewSkill).subscribe(
      data=>{
        this.cargarSkill();
        this.toNewSkill = {nombreS : "", percent : 0, url_foto:""}
      }, err=>{
        console.log(err);
        alert('fallo'+err);
      }
    )
  }
  crearSkill(){
    const options: NgbModalOptions = {
      windowClass: 'document-preview-modal',
      centered: true,
      size: 'xl',
    };
    
    const modal = this.modalService.open(UploadFileModalComponent, options);
    modal.componentInstance.field1name = "Nombre";
    modal.componentInstance.field2name = "Url_Foto";
    modal.componentInstance.field3name = "Porcentaje";
    modal.componentInstance.butttonText = "Crear";
    modal.componentInstance.field1 = this.toNewSkill.nombreS;
    modal.componentInstance.field2 = this.toNewSkill.url_foto;
    modal.componentInstance.field3 = this.toNewSkill.percent;
    modal.componentInstance.buttonFunction = this.createSkill.bind(this);
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toNewSkill.nombreS = receivedEntry;
    });
    modal.componentInstance.field2Change.subscribe((receivedEntry: any) => {
      this.toNewSkill.url_foto = receivedEntry;
    });
    modal.componentInstance.field3Change.subscribe((receivedEntry: any) => {
      this.toNewSkill.percent = receivedEntry;
    });
    return modal;
  }

  updateSkill(){
    this.skillServ.update(this.toEditPro.id, this.toEditPro).subscribe(
      data=>{
        this.router.navigate(['']);
      }, err=>{
        alert("Error al modificar Skill");
        this.router.navigate(['']);
      }
    )
  }
  modificarSkill(skillToUpdate: Skill){
    this.toEditPro = skillToUpdate;
    const options: NgbModalOptions = {
      windowClass: 'document-preview-modal',
      centered: true,
      size: 'xl',
    };
    
    const modal = this.modalService.open(UploadFileModalComponent, options);
    modal.componentInstance.field1name = "Nombre";
    modal.componentInstance.field2name = "Url Foto";
    modal.componentInstance.field3name = "Porcentaje";
    modal.componentInstance.butttonText = "Actualizar";
    modal.componentInstance.field1 = this.toEditPro.nombreS
    modal.componentInstance.field2 = this.toEditPro.url_foto
    modal.componentInstance.field3 = this.toEditPro.percent
    modal.componentInstance.buttonFunction = this.updateSkill.bind(this);
    modal.componentInstance.field1Change.subscribe((receivedEntry: any) => {
      this.toEditPro.nombreS = receivedEntry;
    });
    modal.componentInstance.field2Change.subscribe((receivedEntry: any) => {
      this.toEditPro.url_foto = receivedEntry;
    });
    modal.componentInstance.field3Change.subscribe((receivedEntry: any) => {
      this.toEditPro.percent = receivedEntry;
    });
    return modal;
  }




  delete(skill:Skill){
    const id = skill.id;
    if(id!=undefined){
      this.skillServ.delete(id).subscribe(
        data=>{
          this.cargarSkill();
        },err=>{
          alert("No se pudo eliminar LA EXP");
        }
      )
    }
  }




}

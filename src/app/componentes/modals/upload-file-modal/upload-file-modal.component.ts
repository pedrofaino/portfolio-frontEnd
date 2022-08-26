import { AnimateTimings } from '@angular/animations';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagenServService } from 'src/app/service/imagen-serv.service';

@Component({
  selector: 'app-upload-file-modal',
  templateUrl: './upload-file-modal.component.html',
  styleUrls: ['./upload-file-modal.component.scss']
})
export class UploadFileModalComponent {
  @Input() buttonFunction: Function;
  @Input() field1: any;
  @Input() field2: any;
  @Input() field3: any;
  @Input() field1name: any;
  @Input() field2name: any;
  @Input() field3name: any;
  @Input() butttonText: any;
  @Output() field1Change: EventEmitter<string> = new EventEmitter<string>();
  @Output() field2Change: EventEmitter<string> = new EventEmitter<string>();
  @Output() field3Change: EventEmitter<string> = new EventEmitter<string>();

  

  data: any = {};

  file:File;

  constructor(
    public activeModal: NgbActiveModal,
    private imgService: ImagenServService
  ) {}

  handleFileInput(event: Event) {
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.file=file;
    // this.fileToUpload = first(file);
  }
  
  update(){
    this.imgService.upload(this.file).subscribe(data => {
      this.field2 = data.imagenUrl;
      this.field1Change.emit(this.field1);
      this.field2Change.emit(this.field2);
      this.field3Change.emit(this.field3);
      this.buttonFunction();
      this.activeModal.close();
  });
    
  }
}

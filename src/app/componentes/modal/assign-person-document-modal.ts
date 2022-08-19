import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assign-person-document-modal',
  templateUrl: './assign-person-document-modal.html',
  styleUrls: ['./assign-person-document-modal.scss'],
})
export class ModalAssignPersonDocumentComponent {
  @Input() onUpdate: any;
  @Input() field1: any;
  @Input() field2: any;
  @Input() field1name: any;
  @Input() field2name: any;
  @Output() field1Change: EventEmitter<string> = new EventEmitter<string>();
  @Output() field2Change: EventEmitter<string> = new EventEmitter<string>();

  data: any = {};

  documents: any;
  currentSelectedPerson: any;
  isSelectedProgramLiheap: any;
  isConfirmEnabled: boolean;

  constructor(
    public activeModal: NgbActiveModal,
  ) {}

  update(){
    this.field1Change.emit(this.field1);
    this.field2Change.emit(this.field2);
    this.onUpdate();
    this.activeModal.close();
  }
 
}
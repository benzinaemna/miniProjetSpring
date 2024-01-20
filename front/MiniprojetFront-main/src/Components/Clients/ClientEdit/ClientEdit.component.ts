import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { NgbActiveModal, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { UUID } from 'crypto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientServiceService } from 'src/Services/ClientService.service';
export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  numTel: string;
  adresse: string;
  mf: string;
  cin: string;
}

@Component({
  selector: 'app-ClientEdit',
  templateUrl: './ClientEdit.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule, MatTableModule, MatSortModule, NgbPaginationModule, NgbModule],
  styleUrls: ['./ClientEdit.component.scss']
})
export class ClientEditComponent {
  dialogReff: any;
  @Input() data: Client;
  constructor(
    public activeModal: NgbActiveModal,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private clientService: ClientServiceService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content) {
    this.dialogReff = this.modalService.open(content);
  }
  doAction() {
    if (!this.data.id) {
      this.clientService
        .post(this.data)
        .toPromise()
        .then((y) => {
          this.activeModal.close();
        })
        .catch();
    } else {
      this.clientService
        .put(this.data)
        .toPromise()
        .then((y) => {
          //this.local_data.id= y.id;
          this.activeModal.close();
        })
        .catch();
    }
    this.activeModal.close(this.dialogReff);
  }
  closeDialog() {
    this.modalService.dismissAll({ event: 'Cancel' });
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgbActiveModal, NgbModal, NgbModalConfig, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UUID } from 'crypto';
import { ClientServiceService } from 'src/Services/ClientService.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
export interface Client {
  id: UUID;
  firstName: string;
  lastName: string;
  email: string;
  numTel: string;
  adresse: string;
  mf: string;
  cin: string;
}
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, SharedModule, MatTableModule, MatSortModule, NgbPaginationModule, NgbModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})

export class ClientComponent  implements OnInit{
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
  ngOnInit(): void {
    console.log("ggggg")
    
  }

  open(content) {
    this.dialogReff = this.modalService.open(content);
  }

  closeDialog() {
    this.modalService.dismissAll({ event: 'Cancel' });
  }
}

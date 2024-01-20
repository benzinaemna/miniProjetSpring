import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'src/Components/Clients/Clients.component';
import { FactureService } from 'src/Services/facture.service';

export interface Facture {
  id: number;
  dateFacture: Date;
  facturelignes: [];
  client: Client;
  price : number,
  clientID: number;
}
@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit{
  dialogReff: any;
  @Input() data: Client;
  constructor(
    public activeModal: NgbActiveModal,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private factureService: FactureService,
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

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgbActiveModal, NgbModal, NgbModalConfig, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Categorie } from 'src/Components/list-categories/list-categories.component';
import { ProduitService } from 'src/Services/produit.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
export interface Produit {
  id: number;
  designation: string;
  code: string;
  prixAchat: number;
  prixVente: number;
  categorieDesignation:string;
  categorie: Categorie;
  _links: {
    _self: { href: string };
    produit: { href: string };
    categorie: { href: string };
  };
}
@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule, SharedModule, MatTableModule, MatSortModule, NgbPaginationModule, NgbModule],
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent  {
  dialogReff: any;
@Input() data: Produit;
constructor(
  public activeModal: NgbActiveModal,
  config: NgbModalConfig,
  private modalService: NgbModal,
  private produitService: ProduitService,
) {
  config.backdrop = 'static';
  config.keyboard = false;
}

open(content) {
  this.dialogReff = this.modalService.open(content);
}

closeDialog() {
  this.modalService.dismissAll({ event: 'Cancel' });
}
}

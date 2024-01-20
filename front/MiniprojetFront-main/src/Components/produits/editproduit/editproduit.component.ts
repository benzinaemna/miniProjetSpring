import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgbActiveModal, NgbModal, NgbModalConfig, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UUID } from 'crypto';
import { Categorie } from 'src/Components/list-categories/list-categories.component';
import { CategorieService } from 'src/Services/categorie.service';
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
  selector: 'app-editproduit',
  standalone: true,
  imports: [CommonModule, SharedModule, MatTableModule, MatSortModule, NgbPaginationModule, NgbModule],
  templateUrl: './editproduit.component.html',
  styleUrls: ['./editproduit.component.scss']
})
export class EditproduitComponent implements OnInit{
  dialogReff: any;
  @Input() data: Produit;
listCategorie: Categorie[];
SelectedCategorie: Categorie;
  constructor(
    public activeModal: NgbActiveModal,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private produitService: ProduitService,
    private categorieService : CategorieService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
    this.categorieService.getAll().subscribe({
      next: (data: any) => {
        this.listCategorie = data._embedded.categories;
      },

      error: (error: any) => {
        console.error('Error fetching data:', error);
      },
      complete: () => console.log('datafetched ')
    });
  }

  open(content) {
    this.dialogReff = this.modalService.open(content);
  }
  
  doAction() {
    if (!this.data.id) {
      this.produitService
        .post(this.data)
        .toPromise()
        .then((y) => {
          console.log(this.data.categorie)
          this.activeModal.close();
        })
        .catch();
    } else {
      this.produitService
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

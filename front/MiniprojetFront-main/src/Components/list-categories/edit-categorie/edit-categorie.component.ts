import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgbActiveModal, NgbModal, NgbModalConfig, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UUID } from 'crypto';
import { CategorieService } from 'src/Services/categorie.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

export interface Categorie {
  id: number;
  code: string;
  designation: string;
}
export interface apiResponse {
  _embedded: {
    categories: Categorie[];
  };
  _links: {};
  page: {
    size: number,
    totalElements : number,
    totalPages : 1
    number : 0
  };
}
@Component({
  selector: 'app-edit-categorie',
  standalone: true,
  imports: [CommonModule, SharedModule, MatTableModule, MatSortModule, NgbPaginationModule, NgbModule],
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.scss']
})
export class EditCategorieComponent {
 dialogReff: any;
  @Input() data: Categorie;
constructor(
  public activeModal: NgbActiveModal,
  config: NgbModalConfig,
  private modalService: NgbModal,
  private categorieService: CategorieService,
) {
  config.backdrop = 'static';
  config.keyboard = false;
}

open(content) {
  this.dialogReff = this.modalService.open(content);
}
doAction() {
  if (!this.data.id) {
    this.categorieService
      .post(this.data)
      .toPromise()
      .then((y) => {
        this.activeModal.close();
      })
      .catch();
  } else {
    this.categorieService
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

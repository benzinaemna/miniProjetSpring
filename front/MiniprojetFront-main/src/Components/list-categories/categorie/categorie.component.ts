import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgbActiveModal, NgbModal, NgbModalConfig, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UUID } from 'crypto';
import { CategorieService } from 'src/Services/categorie.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
export interface Categorie {
  id: UUID;
  code: string;
  designation: string;
}
@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [CommonModule, SharedModule, MatTableModule, MatSortModule, NgbPaginationModule, NgbModule],
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent{
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

  closeDialog() {
    this.modalService.dismissAll({ event: 'Cancel' });
  }
}

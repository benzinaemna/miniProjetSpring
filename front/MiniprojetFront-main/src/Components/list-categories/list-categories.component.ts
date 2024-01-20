import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModal, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UUID } from 'crypto';
import { CategorieService, param } from 'src/Services/categorie.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';
import { CategorieComponent } from './categorie/categorie.component';
import { EditCategorieComponent } from './edit-categorie/edit-categorie.component';
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
let ELEMENT_DATA: Categorie[] = [];
@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [CommonModule, SharedModule, MatTableModule, MatSortModule, NgbPaginationModule, NgbModule, FormsModule,],
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export  default class ListCategoriesComponent implements AfterViewInit, OnInit {
  data: any;

  public requestParams: param = {
    page: 0,
    size: 5,
  };

  page: number = 1;
  apiData: apiResponse;
  totalRecords: number;
  selectedPageSize: number = 5;

  showRow(row_obj: Categorie) {
    const dialogRef = this.modalService.open(CategorieComponent,{ size: 'lg'});
    dialogRef.componentInstance.data =row_obj;
 
  dialogRef.result.then((result) => {
    if(result){
      this.initializeData();
    }
   
  },(e)=>{
    console.log(e)
  })
  }
  deleteRow(row_obj: Categorie) {
    console.log(row_obj)
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        this.deleteRowData(row_obj), Swal.fire('Supprimer!', 'Votre ligne a été supprimer.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancel', 'Votre fichier est en sécurité :)', 'error');
      }
    });
  }
  deleteRowData(row_obj: Categorie) {
    console.log(row_obj)
    if (String(row_obj.id) !== 'undefined')
      this.categorieService
        .delete(row_obj.id)
        .toPromise()
        .then((y) => {
          this.dataSource.data = this.dataSource.data.filter((value, key) => {
            return value.id != row_obj.id;
          });
        });
  }
  editRow(row_obj: Categorie) {
   // console.log(row_obj)
    const dialogRef = this.modalService.open(EditCategorieComponent,{ size: 'lg'});
      dialogRef.componentInstance.data =row_obj;
   
    dialogRef.result.then((result) => {
      if(result){
        this.initializeData();
      }
     
    },(e)=>{
      console.log(e)
    })
      
  }
  constructor(
    private categorieService: CategorieService,
    private modalService: NgbModal 
  ) { }

  ngOnInit(): void {
    this.initializeData();
  }
  initializeData(): void {
    this.categorieService.getAll(this.requestParams).subscribe({
      next: (data: any) => {
        this.apiData = data;
        ELEMENT_DATA = this.apiData._embedded.categories;
        this.totalRecords = this.apiData.page.totalElements;
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      },

      error: (error: any) => {
        console.error('Error fetching data:', error);
      },
      complete: () => console.log('datafetched ')
    });
  }
  displayedColumns: string[] = ['code', 'designation', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  onPageChange(page: number): void {
    this.requestParams.page = page-1;
    this.initializeData();
  }
  onPageSizeChange() {
    this.requestParams.size = this.selectedPageSize;
    this.initializeData();
  }

  openModal() {
    const dialogRef = this.modalService.open(EditCategorieComponent,{ size: 'lg'});
    dialogRef.componentInstance.data={};
    dialogRef.result.then((result) => {
      console.log("done");
       this.initializeData();
    },(e)=>{
      console.log(e);
      this.initializeData();
    })
      
  }
}

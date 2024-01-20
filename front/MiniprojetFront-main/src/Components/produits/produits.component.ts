import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UUID } from 'crypto';
import { Categorie } from '../list-categories/list-categories.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { NgbModal, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ProduitService, param } from 'src/Services/produit.service';
import { ProduitComponent } from './produit/produit.component';
import Swal from 'sweetalert2';
import { EditproduitComponent } from './editproduit/editproduit.component';
import { CategorieService } from 'src/Services/categorie.service';
import { Observable, forkJoin, map } from 'rxjs';

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
export interface apiResponse {
  _embedded: {
    produits: Produit[];
  };
  _links: {};
  page: {
    size: number;
    totalElements: number;
    totalPages: 1;
    number: 0;
  };
}
let ELEMENT_DATA: Produit[] = [];
@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, SharedModule, MatTableModule, MatSortModule, NgbPaginationModule, NgbModule, FormsModule],
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export default class ProduitsComponent implements AfterViewInit, OnInit {
  data: any;
  prod: Produit;
  public requestParams: param = {
    page: 0,
    size: 5
  };

  page: number = 1;
  apiData: apiResponse;
  totalRecords: number;
  selectedPageSize: number = 5;

  showRow(row_obj: Produit) {
    const dialogRef = this.modalService.open(ProduitComponent, { size: 'lg' });
    dialogRef.componentInstance.data = row_obj;

    dialogRef.result.then(
      (result) => {
        if (result) {
          this.initializeData();
        }
      },
      (e) => {
        console.log(e);
      }
    );
  }
  deleteRow(row_obj: Produit) {
    console.log(row_obj);
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
  deleteRowData(row_obj: Produit) {
    console.log(row_obj);
    if (String(row_obj.id) !== 'undefined')
      this.produitService
        .delete(row_obj.id)
        .toPromise()
        .then((y) => {
          this.dataSource.data = this.dataSource.data.filter((value, key) => {
            return value.id != row_obj.id;
          });
        });
  }
  editRow(row_obj: Produit) {
    // console.log(row_obj)
    const dialogRef = this.modalService.open(EditproduitComponent, { size: 'lg' });
    dialogRef.componentInstance.data = row_obj;

    dialogRef.result.then(
      (result) => {
        if (result) {
          this.initializeData();
        }
      },
      (e) => {
        console.log(e);
      }
    );
  }
  constructor(
    private produitService: ProduitService,
    private modalService: NgbModal,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.initializeData();
  }
  initializeData(): void {
    this.produitService.getAll(this.requestParams).subscribe({
      next: (data: any) => {
        this.apiData = data;       
        this.processResponse(this.apiData).subscribe({next:(subdata:any)=>{
          ELEMENT_DATA = subdata;
          console.log(ELEMENT_DATA);
          this.totalRecords = this.apiData.page.totalElements;
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        }});       
      },

      error: (error: any) => {
        console.error('Error fetching data:', error);
      },

      complete: () => console.log('datafetched ')
    });
  }
  processResponse(response: apiResponse): Observable<Produit[]> {
    const { _embedded } = response;
    const observables: Observable<Produit>[] = [];  
    if (_embedded && _embedded.produits) {
      _embedded.produits.forEach((produit) => {
        const observable = this.produitService.get('/'+this.extractUUIDFromLink(produit._links.categorie.href));
        const produitWithCategory$: Observable<Produit> = observable.pipe(
          map((categorieData: any) => ({ 
            ...produit,
            categorie: categorieData, 
            categorieDesignation: categorieData.designation,
          })),
        );
        observables.push(produitWithCategory$);
      });
    }
    return forkJoin(observables);
  }
  extractUUIDFromLink(link: string): string | null {
    try {
      const url = new URL(link);
      const pathSegments = url.pathname.split('/');
      const lastTwoSegments = pathSegments.slice(-2);
  
      if (lastTwoSegments && lastTwoSegments.length === 2) {
        const uuidSegment = lastTwoSegments.join('/');
        return uuidSegment;
      } else {
        return null;
      }
    } catch (error) {
      // URL parsing error
      return null;
    }
  }
  getEnabledCategories(): void {
    ELEMENT_DATA.forEach(async(values: Produit)=> {
      console.log(values._links.categorie.href);
      // await this.produitService.getforArticle(values._links.categorie.href).subscribe({
      //   next: (data: any) => {
      //     values.categorie = data;
      //     console.log(values.categorie);
      //   }
      // });
    });
  }
  displayedColumns: string[] = ['designation', 'code', 'prixAchat', 'prixVente', 'categorieDesignation', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  onPageChange(page: number): void {
    this.requestParams.page = page - 1;
    this.initializeData();
  }
  onPageSizeChange() {
    this.requestParams.size = this.selectedPageSize;
    this.initializeData();
  }

  openModal() {
    const dialogRef = this.modalService.open(EditproduitComponent, { size: 'lg' });
    dialogRef.componentInstance.data = {};
    dialogRef.result.then(
      (result) => {
        console.log('done');
        this.initializeData();
      },
      (e) => {
        this.initializeData();
        console.log(e);
      }
    );
  }
}

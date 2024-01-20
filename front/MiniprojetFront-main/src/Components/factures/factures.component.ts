import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModal, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UUID } from 'crypto';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Client } from '../Clients/Clients.component';
import { FactureService, param } from 'src/Services/facture.service';
import { FactureComponent } from './facture/facture.component';
import Swal from 'sweetalert2';
import { EditfacturesComponent } from './editfactures/editfactures.component';

export interface Facture {
  id: number;
  dateFacture: Date;
  facturelignes: [];
  client: Client;
  price : number,
  clientID: number;
}
export interface apiResponse {
  _embedded: {
    factures: Facture[];
  };
  _links: {};
  page: {
    size: number,
    totalElements : number,
    totalPages : 1
    number : 0
  };
}
let ELEMENT_DATA: Facture[] = [];
@Component({
  selector: 'app-factures',
  standalone: true,
  imports: [CommonModule, SharedModule, MatTableModule, MatSortModule, NgbPaginationModule, NgbModule],
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.scss']
})
export default class FacturesComponent implements AfterViewInit, OnInit {
  data: any;
  factures:[{date:"20/01/2024" ,
  client: "Ali";
  price : 500,}]

  
  public requestParams: param = {
    page: 0,
    size: 5,
  };

  page: number = 1;
  apiData: apiResponse;
  totalRecords: number;
  selectedPageSize: number = 5;

  showRow(row_obj: Client) {
    const dialogRef = this.modalService.open(FactureComponent,{ size: 'lg'});
    dialogRef.componentInstance.data =row_obj;
 
  dialogRef.result.then((result) => {
    if(result){
      this.initializeData();
    }
   
  },(e)=>{
    console.log(e)
  })
  }
  deleteRow(row_obj: Facture) {
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
  deleteRowData(row_obj: Facture) {
    console.log(row_obj)
    if (String(row_obj.id) !== 'undefined')
      this.factureService
        .delete(row_obj.id)
        .toPromise()
        .then((y) => {
          this.dataSource.data = this.dataSource.data.filter((value, key) => {
            return value.id != row_obj.id;
          });
        });
  }
  editRow(row_obj: Facture) {
    const dialogRef = this.modalService.open(EditfacturesComponent,{ size: 'lg'});
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
    private factureService: FactureService,
    private modalService: NgbModal 
  ) { }

  ngOnInit(): void {
    this.initializeData();
  }
  initializeData(): void {
    this.factureService.getAll(this.requestParams).subscribe({
      next: (data: any) => {
        this.apiData = data;
        ELEMENT_DATA = this.apiData._embedded.factures;
        this.totalRecords = this.apiData.page.totalElements;
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      },
      complete: () => console.log('datafetched ')
    });
  }
  displayedColumns: string[] = ['dateFacture', 'facturelignes', 'client.firstName', 'action'];
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
    const dialogRef = this.modalService.open(EditfacturesComponent,{ size: 'lg'});
    dialogRef.componentInstance.data={};
    dialogRef.result.then((result) => {
      console.log("done");
       this.initializeData();
    },(e)=>{
      console.log(e)
    })
      
  }
}

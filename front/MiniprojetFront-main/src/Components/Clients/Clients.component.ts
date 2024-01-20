import { ClientServiceService, param } from './../../Services/ClientService.service';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UUID } from 'crypto';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { ClientEditComponent } from './ClientEdit/ClientEdit.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ClientComponent } from './client/client.component';

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
export interface apiResponse {
  _embedded: {
    clients: Client[];
  };
  _links: {};
  page: {
    size: number,
    totalElements : number,
    totalPages : 1
    number : 0
  };
}
let ELEMENT_DATA: Client[] = [];
@Component({
  selector: 'app-Clients',
  standalone: true,
  imports: [CommonModule, SharedModule, MatTableModule, MatSortModule, NgbPaginationModule, NgbModule],
  templateUrl: './Clients.component.html',
  styleUrls: ['./Clients.component.scss']
})
export default class ClientsComponent implements AfterViewInit, OnInit {
  data: any;

  public requestParams: param = {
    page: 0,
    size: 5,
  };

  page: number = 1;
  apiData: apiResponse;
  totalRecords: number;
  selectedPageSize: number = 5;

  showRow(row_obj: Client) {
    const dialogRef = this.modalService.open(ClientComponent,{ size: 'lg'});
    dialogRef.componentInstance.data =row_obj;
 
  dialogRef.result.then((result) => {
    if(result){
      this.initializeData();
    }
   
  },(e)=>{
    console.log(e)
  })
  }
  deleteRow(row_obj: Client) {
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
  deleteRowData(row_obj: Client) {
    console.log(row_obj)
    if (String(row_obj.id) !== 'undefined')
      this.clientService
        .delete(row_obj.id)
        .toPromise()
        .then((y) => {
          this.dataSource.data = this.dataSource.data.filter((value, key) => {
            return value.id != row_obj.id;
          });
        });
  }
  editRow(row_obj: Client) {
    const dialogRef = this.modalService.open(ClientEditComponent,{ size: 'lg'});
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
    private clientService: ClientServiceService,
    private modalService: NgbModal 
  ) { }

  ngOnInit(): void {
    this.initializeData();
  }
  initializeData(): void {
    this.clientService.getAll(this.requestParams).subscribe({
      next: (data: any) => {
        this.apiData = data;
        ELEMENT_DATA = this.apiData._embedded.clients;
        this.totalRecords = this.apiData.page.totalElements;
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      },
      complete: () => console.log('datafetched ')
    });
  }
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'numTel', 'adresse', 'mf', 'cin', 'action'];
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
    const dialogRef = this.modalService.open(ClientEditComponent,{ size: 'lg'});
    dialogRef.componentInstance.data={};
    dialogRef.result.then((result) => {
      console.log("done");
       this.initializeData();
    },(e)=>{
      console.log(e)
    })
      
  }
}

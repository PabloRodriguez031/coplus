import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';
import { Subject } from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-iglesia',
  templateUrl: './iglesia.component.html',
  styleUrls: ['./iglesia.component.css']
})
export class IglesiaComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
   dtOptions: DataTables.Settings = {};
   dtTrigger: Subject<boolean> = new Subject();

  documentos :any = []; 
  coleccion = 'iglesia';

  isLoading = false;

  constructor(public apiService: ApiService, private router: Router, private notificationsService: NotificationsService) { }

  ngOnInit() {

    this.dtOptions = environment.dtOptions;
    this.isLoading = true;

    firebase.firestore().collection(this.coleccion).onSnapshot((snapshot) => {
      this.documentos = [] as any;
      snapshot.forEach(doc => {
          this.documentos.push({
              id: doc.id,
              data: doc.data()
          });
      });
      if(this.isLoading){
        this.isLoading = false;
        this.dtTrigger.next(false);  
      }else{
        this.rerenderDatatable();
      }            
    });
  }

  deleteDocumento(documento) {    
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
        this.apiService.deleteDocumento(this.coleccion, documento);
        this.notificationsService.showSwal('Borrado', 'La iglesia ha sido borrada con éxito', 'success');
      }
    });
  }

  editDocumento(documento) {
    this.router.navigate(['/editar-iglesia',documento.id])
  }

  rerenderDatatable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
  }

}

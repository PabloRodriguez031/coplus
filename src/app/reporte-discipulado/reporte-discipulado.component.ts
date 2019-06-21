import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';
import { Subject } from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-reporte-discipulado',
  templateUrl: './reporte-discipulado.component.html',
  styleUrls: ['./reporte-discipulado.component.css']
})
export class ReporteDiscipuladoComponent implements OnInit {

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<boolean> = new Subject();

  documentos :any = []; 
  coleccion = 'reporte_discipulado';

  discipulados :any = []; 

  isLoading = false;

  constructor(public apiService: ApiService, private router: Router, private notificationsService: NotificationsService ) { }

  ngOnInit() {

    this.dtOptions = environment.dtOptions;
    this.isLoading = true;

    firebase.firestore().collection('discipulado').onSnapshot((snapshot) => {
      this.discipulados = [] as any;
      snapshot.forEach(doc => {
          this.discipulados.push({
              id: doc.id,
              data: doc.data()
          });
      });

      firebase.firestore().collection(this.coleccion).onSnapshot((snapshot) => {
        this.documentos = [] as any;
        snapshot.forEach(doc => {
            this.documentos.push({
                id: doc.id,
                data: doc.data()
            });
        });

        this.documentos.forEach(discipulado => {
          this.discipulados.forEach(nombre => {
            if(discipulado.data['discipulado'] === nombre.id){
              discipulado.data['discipulado_nombre'] = nombre.data['discipulado'];
            }
          });
        });

        if(this.isLoading){
          this.isLoading = false;
          this.dtTrigger.next(false);  
        }else{
          this.rerenderDatatable();
        }    

     });
   });
  }

  deleteDocumento(documento) {        
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
        this.apiService.deleteDocumento(this.coleccion, documento).then(respuesta => {
          this.notificationsService.showSwal('Borrado', 'El reporte ha sido borrado con éxito', 'success');          
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        });
      }
    });  
  }

  editDocumento(documento) {
    this.router.navigate(['/editar-reporte-discipulado',documento.id])
  }

  asistencia(documento, discipulado) {
    this.router.navigate(['/asistencia-discipulado',documento.id, discipulado])
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

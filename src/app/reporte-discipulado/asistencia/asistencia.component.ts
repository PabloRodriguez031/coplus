import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api.service';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';
import { Subject } from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<boolean> = new Subject();

  usuariosDicipulado :any = [];
  coleccion = 'usuario';

  documentos2 :any = []; 
  coleccion2 = 'discipulado';

  documentos :any = [];

  documentoId;
  reporteId;

  isLoading = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private notificationsService: NotificationsService) { }

  ngOnInit() {

    this.dtOptions = environment.dtOptions;
    this.isLoading = true;
    
    this.documentoId = this.route.snapshot.params['discipulado'];
    this.apiService.getDocumentoById(this.coleccion2, this.documentoId).then(discipulado => {
      this.documentos2 = {
        id: discipulado.id,
        data: discipulado.data()
      };
    });

    firebase.firestore().collection(this.coleccion).where('discipuloId', '==', this.documentoId).onSnapshot((snapshot) => {
      this.usuariosDicipulado = [] as any;
      snapshot.forEach(doc => {
          this.usuariosDicipulado.push({
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

    this.reporteId = this.route.snapshot.params['id'];
    this.apiService.getDocumentoById('reporte_discipulado', this.reporteId).then(reporte => {
      this.documentos = {
        id: reporte.id,
        data: reporte.data()
      };
    });
  }
  
  marcarAsistencia(id) {  
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');

        const indice = this.documentos2.data['discipulosIds'].findIndex(estudiante =>{
          return estudiante.id === id;
        })

        if(!this.documentos2.data['discipulosIds'][indice]['asistencias']){
          this.documentos2.data['discipulosIds'][indice]['asistencias'] = []
        }
        

        this.documentos2.data['discipulosIds'][indice]['asistencias'].push({
          id: id,
          fecha: this.documentos.data['fecha'],
          reporte: this.documentos.id
        });

        this.apiService.updateDocumento('discipulado', { 
          discipulosIds: this.documentos2.data['discipulosIds']
        }, this.documentoId).then(respuesta => {        
          this.notificationsService.showSwal('Editado', 'La asistencia ha sido ingresada con éxito', 'success');
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        })

      }
    });
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

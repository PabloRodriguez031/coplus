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
  coleccion2 = 'grupo';

  documentos :any = [];
  usuarios :any = [];

  documentoId;
  reporteId;

  isLoading = false;

  reportado;  

  constructor(private route: ActivatedRoute, private apiService: ApiService, private notificationsService: NotificationsService) { }

  ngOnInit() {
    
    this.dtOptions = environment.dtOptions;
    this.isLoading = true;

    this.documentoId = this.route.snapshot.params['grupo'];
    this.apiService.getDocumentoById(this.coleccion2, this.documentoId).then(discipulado => {
      this.documentos2 = {
        id: discipulado.id,
        data: discipulado.data()
      };
      

      this.reporteId = this.route.snapshot.params['id'];
      this.apiService.getDocumentoById('reporte_grupo', this.reporteId).then(reporte => {
        this.documentos = {
          id: reporte.id,
          data: reporte.data()
        };
        
        firebase.firestore().collection(this.coleccion).onSnapshot((snapshot) => {
          this.usuarios = [] as any;
          snapshot.forEach(doc => {
              this.usuarios.push({
                  id: doc.id,
                  data: doc.data()
              });

              this.documentos2.data.gruposIds.forEach(id_grupo => {
                this.usuarios.forEach(usuario => {
                  if(usuario.id === id_grupo.id){
                    id_grupo.id =  usuario.data['nombre'] + ' ' + usuario.data['apellido']                    
                  }
                })
              })

            });

            if(this.isLoading){
              this.isLoading = false;
              this.dtTrigger.next(false);  
            }else{
              this.rerenderDatatable();
            }
    
        });




      this.documentos2.data.gruposIds.forEach(usuario_grupo => {   
        
        usuario_grupo.asistencias.forEach(asistencia => {

          if(asistencia.reporte === this.documentos.id){            
            if(asistencia.fecha === this.documentos.data['fecha']){
              this.reportado = 'true'
              asistencia.reportado = this.reportado
            }
          }

        })

      })
    });
  });


    
  }
  
  checked = false;

  marcarAsistencia(id) {  
    
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');

        const indice = this.documentos2.data['gruposIds'].findIndex(estudiante =>{
          return estudiante.id === id;
        })
        

        if(!this.documentos2.data['gruposIds'][indice]['asistencias']){
          this.documentos2.data['gruposIds'][indice]['asistencias'] = []
        }                

        this.documentos2.data['gruposIds'][indice]['asistencias'].push({
          id: id,
          fecha: this.documentos.data['fecha'],
          reporte: this.documentos.id
        });

        this.apiService.updateDocumento('grupo', { 
          gruposIds: this.documentos2.data['gruposIds']
        }, this.documentoId).then(respuesta => {        
          this.notificationsService.showSwal('Editado', 'La asistencia ha sido ingresada con éxito', 'success');
          this.checked = true
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

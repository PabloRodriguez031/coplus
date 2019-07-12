import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';
import { Subject } from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-reporte-grupo',
  templateUrl: './reporte-grupo.component.html',
  styleUrls: ['./reporte-grupo.component.css']
})
export class ReporteGrupoComponent implements OnInit {

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<boolean> = new Subject();

  documentos :any = []; 
  coleccion = 'reporte_grupo';

  temas :any = []; 
  grupos :any = []; 
  usuarios :any = [];

  isLoading = false;

  constructor(public apiService: ApiService, private router: Router, private notificationsService: NotificationsService ) { }

  ngOnInit() {

    this.dtOptions = environment.dtOptions;
    this.isLoading = true;

    firebase.firestore().collection('predica').onSnapshot((snapshot) => {
      this.temas = [] as any;
      snapshot.forEach(doc => {
          this.temas.push({
              id: doc.id,
              data: doc.data()
          });
      });

      firebase.firestore().collection('grupo').onSnapshot((snapshot) => {
        this.grupos = [] as any;
        snapshot.forEach(doc => {
            this.grupos.push({
                id: doc.id,
                data: doc.data()
            });
        });

        firebase.firestore().collection('usuario').onSnapshot((snapshot) => {
          this.usuarios = [] as any;
          snapshot.forEach(doc => {
              this.usuarios.push({
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

            this.documentos.forEach(planificacion => {
            this.temas.forEach(tema => {
              if(planificacion.data['tema'] === tema.id){
                planificacion.data['tema_nombre'] = tema.data['nombre'];
              }
            });
          });

          this.documentos.forEach(grupo => {
            this.grupos.forEach(grupos => {
              if(grupo.data['grupo'] === grupos.id){
                grupo.data['grupo_nombre'] = grupos.data['nombre'];
              }
            });
          });

          this.documentos.forEach(usuario => {
            this.usuarios.forEach(usuarios => {
              if(usuario.data['predicador'] === usuarios.id){
                usuario.data['predicador_nombre'] = usuarios.data['nombre'] + ' ' + usuarios.data['apellido'] ;
              }
            })
          })

          this.documentos.forEach(usuario => {
            this.usuarios.forEach(usuarios => {
              if(usuario.data['bienvenida_vision'] === usuarios.id){
                usuario.data['bienvenida_vision_nombre'] = usuarios.data['nombre'] + ' ' + usuarios.data['apellido'] ;
              }
            })
          })

          this.documentos.forEach(usuario => {
            this.usuarios.forEach(usuarios => {
              if(usuario.data['ofrenda'] === usuarios.id){
                usuario.data['ofrenda_nombre'] = usuarios.data['nombre'] + ' ' + usuarios.data['apellido'] ;
              }
            })
          })

          if(this.isLoading){
            this.isLoading = false;
            this.dtTrigger.next(false);  
          }else{
            this.rerenderDatatable();
          }

          });
        });        
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
    this.router.navigate(['/editar-reporte',documento.id])
  }

  asistencia(documento, grupo) {
    this.router.navigate(['/asistencia-grupo',documento.id, grupo])
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

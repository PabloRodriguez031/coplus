import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-reporte-grupo',
  templateUrl: './reporte-grupo.component.html',
  styleUrls: ['./reporte-grupo.component.css']
})
export class ReporteGrupoComponent implements OnInit {

  documentos :any = []; 
  coleccion = 'reporte_grupo';

  temas :any = []; 
  grupos :any = []; 

  constructor(public apiService: ApiService, private router: Router, private notificationsService: NotificationsService ) { }

  ngOnInit() {
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

  asistencia(documento) {
    this.router.navigate(['/asistencia-grupo',documento.id])
  }
}

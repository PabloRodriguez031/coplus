import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-planificacion-grupo',
  templateUrl: './planificacion-grupo.component.html',
  styleUrls: ['./planificacion-grupo.component.css']
})
export class PlanificacionGrupoComponent implements OnInit {

  documentos :any = []; 
  coleccion = 'planificacion_grupo';

  predicas :any = [];
  grupos :any = [];
  usuarios :any = [];


  constructor(public apiService: ApiService, private router: Router, private notificationsService: NotificationsService ) { }

  ngOnInit() {

    firebase.firestore().collection('predica').onSnapshot((snapshot) => {
      this.predicas = [] as any;
      snapshot.forEach(doc => {
          this.predicas.push({
              id: doc.id,
              data: doc.data()
          });
      });

      firebase.firestore().collection('grupo').onSnapshot((snapshot) =>{
        this.grupos = [] as any;
        snapshot.forEach(doc => {
            this.grupos.push({
                id: doc.id,
                data: doc.data()
            });
        });


      firebase.firestore().collection('usuario').onSnapshot((snapshot) =>{
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
        this.documentos.forEach(tema => {
        this.predicas.forEach(predica => {
          if(tema.data['tema'] === predica.id){
            tema.data['predica_nombre'] = predica.data['nombre'];
           }
          });

        this.grupos.forEach(grupo => {
          if(tema.data['grupo'] === grupo.id){
            tema.data['grupo_nombre'] = grupo.data['nombre'];
           }
          });

        this.usuarios.forEach(usuario => {
          if(tema.data['predicador'] === usuario.id){
            tema.data['predicador_nombre'] = usuario.data['nombre'];
            tema.data['predicador_apellido'] = usuario.data['apellido'];
           }
          });

          this.usuarios.forEach(usuario => {
          if(tema.data['bienvenida_vision'] === usuario.id){
            tema.data['bienvenida_vision_nombre'] = usuario.data['nombre'];
            tema.data['bienvenida_vision_apellido'] = usuario.data['apellido'];
           }
          });

          this.usuarios.forEach(usuario => {
            if(tema.data['ofrenda'] === usuario.id){
              tema.data['ofrenda_nombre'] = usuario.data['nombre'];
              tema.data['ofrenda_apellido'] = usuario.data['apellido'];
             }
            });
          
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
          this.notificationsService.showSwal('Borrado', 'La planificacion ha sido borrada con éxito', 'success');
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        });
      }
    });  
  }

  editDocumento(documento) {
    this.router.navigate(['/editar-planificacion-grupo',documento.id])
  }

  reporteGrupo(documento){
    this.router.navigate(['/reporte-grupo',documento.id])
  }

}

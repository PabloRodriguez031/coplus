import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-planificacion-form',
  templateUrl: './planificacion-form.component.html',
  styleUrls: ['./planificacion-form.component.css']
})
export class PlanificacionFormComponent implements OnInit {

  documentos = {} as any;
  coleccion = 'planificacion_grupo';

  documentos2 = {} as any;
  coleccion2 = 'predica';

  documentos3 = {} as any;
  coleccion3 = 'grupo';

  documentos4 = {} as any;
  coleccion4 = 'usuario';

  constructor(public apiService: ApiService, private notificationsService: NotificationsService) { }

  ngOnInit() {
    firebase.firestore().collection(this.coleccion2).onSnapshot((snapshot) => {
      this.documentos2 = [] as any;
      snapshot.forEach(doc => {
          this.documentos2.push({
              id: doc.id,
              data: doc.data()
          });
      });
    });

    firebase.firestore().collection(this.coleccion3).onSnapshot((snapshot) => {
      this.documentos3 = [] as any;
      snapshot.forEach(doc => {
          this.documentos3.push({
              id: doc.id,
              data: doc.data()
          });
      });
    });

    firebase.firestore().collection(this.coleccion4).where("graduado", "==", "Si").onSnapshot((snapshot) => {
      this.documentos4 = [] as any;
      snapshot.forEach(doc => {
          this.documentos4.push({
              id: doc.id,
              data: doc.data()
          });
      });
    });
  }

  addDocumento(form:NgForm) {  
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
        this.apiService.addDocumento(this.coleccion, {
          tema: form.value.tema,
          fecha: form.value.fecha,
          grupo: form.value.grupo,
          predicador: form.value.predicador,
          bienvenida_vision: form.value.bienvenida_vision,
          ofrenda: form.value.ofrenda
        }).then(respuesta => {
          this.notificationsService.showSwal('Creado', 'La planificacion ha sido creada con éxito', 'success');
          form.resetForm();
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        });
      }
    });
  }

}

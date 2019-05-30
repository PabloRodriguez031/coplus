import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-discipulado-form',
  templateUrl: './discipulado-form.component.html',
  styleUrls: ['./discipulado-form.component.css']
})
export class DiscipuladoFormComponent implements OnInit {

  documentos = {} as any;
  coleccion = 'discipulado';

  documentos2 = {} as any;
  coleccion2 = 'red';

  constructor(public apiService: ApiService, private notificationsService: NotificationsService) { }

  ngOnInit() {

    firebase.firestore().collection(this.coleccion).onSnapshot((snapshot) => {
      this.documentos = [] as any;
      snapshot.forEach(doc => {
          this.documentos.push({
              id: doc.id,
              data: doc.data()
          });
      });
    });

    firebase.firestore().collection(this.coleccion2).onSnapshot((snapshot) => {
      this.documentos2 = [] as any;
      snapshot.forEach(doc => {
          this.documentos2.push({
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
          discipulado: form.value.discipulado,
          red: form.value.red,
          direccion: form.value.direccion,
          zona: form.value.zona,
          hora: form.value.hora,
          discipuladoPadre: form.value.discipuladoPadre,
          discipulosIds: [],
          lideresIds: []
        }).then(respuesta => {
          this.notificationsService.showSwal('Creado', 'El discipulado ha sido creado con éxito', 'success');
          form.resetForm();
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        });
      }
    });
  }

}

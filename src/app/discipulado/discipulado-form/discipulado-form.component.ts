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

  documentos3 = {} as any;
  coleccion3 = 'usuario';

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
  }

  addDocumento(form:NgForm) {  
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
        this.apiService.addDocumento(this.coleccion, {
          discipulado: form.value.discipulado,
          red: form.value.red,
          lideres: form.value.lideres,
          direccion: form.value.direccion,
          zona: form.value.zona,
          hora: form.value.hora
        });
        form.resetForm();
        this.notificationsService.showSwal('Creado', 'El discipulado ha sido creado con éxito', 'success');
      }
    });
  }

}

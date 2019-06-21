import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'app/servicios/notifications.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-iglesia-form',
  templateUrl: './iglesia-form.component.html',
  styleUrls: ['./iglesia-form.component.css']
})
export class IglesiaFormComponent implements OnInit {

  documentos = {} as any;
  coleccion = 'iglesia';

  
  usuarios = {} as any;

  constructor(public apiService: ApiService, private notificationsService: NotificationsService) { }

  ngOnInit() {

    firebase.firestore().collection('usuario').where('graduado', '==', 'Si').onSnapshot((snapshot) => {
      this.usuarios = [] as any;
      snapshot.forEach(doc => {
          this.usuarios.push({
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
          nombre: form.value.nombre,
          encargadoIglesia: form.value.encargadoIglesia
        }).then(respuesta => {
          this.notificationsService.showSwal('Creado', 'La iglesia ha sido creada con éxito', 'success');
          form.resetForm();
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        });
      }
    });
  }
}





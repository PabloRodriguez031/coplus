import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-red-form',
  templateUrl: './red-form.component.html',
  styleUrls: ['./red-form.component.css']
})
export class RedFormComponent implements OnInit {

  documentos = {} as any;
  coleccion = 'red';

  documentos2 = {} as any;
  coleccion2 = 'iglesia';

  usuarios = {} as any;

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

    firebase.firestore().collection('usuario').onSnapshot((snapshot) => {
      this.usuarios = [] as any;
      snapshot.forEach(doc => {
          this.usuarios.push({
              id: doc.id,
              data: doc.data()
          });
      });

      this.usuarios.forEach(usuario => {
        usuario.data['nombreCompleto'] = usuario.data['nombre'] + ' ' + usuario.data['apellido'];
      })
    });
  }

  addDocumento(form:NgForm) {  
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
        this.apiService.addDocumento(this.coleccion, {
          descripcion: form.value.descripcion,
          iglesia: form.value.iglesia,
          encargadoRed: form.value.encargadoRed
        }).then(respuesta => {
          this.notificationsService.showSwal('Creado', 'La red ha sido creada con éxito', 'success');
          form.resetForm();
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        });
      }
    });
  }
}

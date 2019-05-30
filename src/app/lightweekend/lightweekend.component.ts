import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-lightweekend',
  templateUrl: './lightweekend.component.html',
  styleUrls: ['./lightweekend.component.css']
})
export class LightweekendComponent implements OnInit {

  documentos = {} as any;
  coleccion = 'light_weekend';

  documentos2 = {} as any;
  coleccion2 = 'red';

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
  }

  addDocumento(form:NgForm) {  
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
        this.apiService.addDocumento(this.coleccion, {
          nombre: form.value.nombre,
          apellido: form.value.apellido,
          edad: form.value.edad,
          correo: form.value.correo,
          telefono: form.value.telefono,
          genero: form.value.genero,
          estado_civil: form.value.estado_civil,
          direccion: form.value.direccion,
          fecha_nacimiento: form.value.fecha_nacimiento,
          asiste_grupo: form.value.asiste_grupo,
          red: form.value.red
        }).then(respuesta =>{
          this.notificationsService.showSwal('Enviado', 'Los datos han sido enviados con éxito', 'success');
          form.resetForm();
        }).catch(error =>{
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        });
      }
    });
  }

}

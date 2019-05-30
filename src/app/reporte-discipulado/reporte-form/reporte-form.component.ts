import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'app/servicios/notifications.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-reporte-form',
  templateUrl: './reporte-form.component.html',
  styleUrls: ['./reporte-form.component.css']
})
export class ReporteFormComponent implements OnInit {

  documentos = {} as any;
  coleccion = 'reporte_discipulado';

  discipulados :any = [];

  constructor(public apiService: ApiService, private notificationsService: NotificationsService) { }

  ngOnInit() {

    firebase.firestore().collection('discipulado').onSnapshot((snapshot) => {
      this.discipulados = [] as any;
      snapshot.forEach(doc => {
          this.discipulados.push({
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
      });

    });  
  }

  addDocumento(form:NgForm) {  
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
        this.apiService.addDocumento(this.coleccion, {
          discipulado: form.value.discipulado,
          fecha: form.value.fecha,
          hora: form.value.hora,
          asistieron: form.value.asistieron,
          observaciones: form.value.observaciones
        }).then(respuesta => {
          this.notificationsService.showSwal('Creado', 'El reporte ha sido creada con éxito', 'success');
          form.resetForm();
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        });
      }
    });
  }

}

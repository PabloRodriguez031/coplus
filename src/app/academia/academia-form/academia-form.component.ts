import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-academia-form',
  templateUrl: './academia-form.component.html',
  styleUrls: ['./academia-form.component.css']
})
export class AcademiaFormComponent implements OnInit {

  documentos = {} as any;
  coleccion = 'academia';

  documentos2 = {} as any;
  coleccion2 = 'red';

  documentos3 = {} as any;
  coleccion3 = 'pensum';

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
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
        this.apiService.addDocumento(this.coleccion, {
          red: form.value.red,
          dia: form.value.dia,
          direccion: form.value.direccion,
          zona: form.value.zona,
          hora: form.value.hora,
          ciclo: form.value.ciclo,
          anio: form.value.anio,
          pensum: form.value.pensum,
          lideresIds: [],
          estudiantesIds: []
        }).then(respuesta => {
          this.notificationsService.showSwal('Creada', 'La academia ha sido creada con éxito', 'success');
          form.resetForm();
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        });
      }
    });
  }

}

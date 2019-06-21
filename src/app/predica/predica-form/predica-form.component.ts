import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-predica-form',
  templateUrl: './predica-form.component.html',
  styleUrls: ['./predica-form.component.css']
})
export class PredicaFormComponent implements OnInit {

  documentos = {} as any;
  coleccion = 'predica';

  today: number = Date.now();


  constructor(public apiService: ApiService, private notificationsService: NotificationsService) { }

  ngOnInit() {

  }

  addDocumento(form:NgForm) {  
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
        this.apiService.addDocumento(this.coleccion, {
          nombre: form.value.nombre,
          mes: form.value.mes,
          semana: form.value.semana,
          versiculos: form.value.versiculos,
          fecha_creacion: this.today
        }).then(respuesta => {
          this.notificationsService.showSwal('Creado', 'La predica ha sido creada con éxito', 'success');
          form.resetForm();
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        });
      }
    });
  }

}

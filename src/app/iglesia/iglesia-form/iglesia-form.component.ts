import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-iglesia-form',
  templateUrl: './iglesia-form.component.html',
  styleUrls: ['./iglesia-form.component.css']
})
export class IglesiaFormComponent implements OnInit {

  documentos = {} as any;
  coleccion = 'iglesia';


  constructor(public apiService: ApiService, private notificationsService: NotificationsService) { }

  ngOnInit() {

  }

  addDocumento(form:NgForm) {  
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
        this.apiService.addDocumento(this.coleccion, {
          nombre: form.value.nombre
        });
        form.resetForm();
        this.notificationsService.showSwal('Creado', 'La iglesia ha sido creada con éxito', 'success');
      }
    });
  }
}





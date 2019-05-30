import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {


  documentos = {} as any;
  coleccion = 'usuario';

  documentos2 = {} as any;
  coleccion2 = 'red';

  documentos3 = {} as any;
  coleccion3 = 'discipulado';

  documentos4 = {} as any;
  coleccion4 = 'grupo';


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

    firebase.firestore().collection(this.coleccion4).onSnapshot((snapshot) => {
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
          nombre: form.value.nombre,
          apellido: form.value.apellido,
          correo: form.value.correo,
          telefono: form.value.telefono,
          fecha_nacimiento: form.value.fecha_nacimiento,
          graduado: form.value.graduado,
          red: form.value.red,
          estudiantesIds: '',
          grupoId: '',
          discipuloId: '',      
          liderDiscipuladoId: '',
          liderGrupoId: '',
          liderAcademiaId: ''             
        }).then(respuesta =>{
          this.notificationsService.showSwal('Creado', 'El usuario ha sido creado con éxito', 'success');
          form.resetForm();
        }).catch(error =>{
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        });
      }
    });
  }

}

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
  coleccion = 'reporte_grupo';

  documentos2 = {} as any;
  coleccion2 = 'planificacion_grupo';

  documentos3 = {} as any;
  coleccion3 = 'grupo';


  temas :any = []; 
  nombres :any = []; 

  val1:number;
  val2:number;
  val3:number;
  total:number;
  resultado:number;

  constructor(public apiService: ApiService, private notificationsService: NotificationsService) { }

  ngOnInit() {

    firebase.firestore().collection('predica').onSnapshot((snapshot) => {
      this.temas = [] as any;
      snapshot.forEach(doc => {
          this.temas.push({
              id: doc.id,
              data: doc.data()
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

        this.documentos2.forEach(planificacion => {
        this.temas.forEach(tema => {
          if(planificacion.data['tema'] === tema.id){
            planificacion.data['tema_nombre'] = tema.data['nombre'];
          }
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
    });  
  }

  addDocumento(form:NgForm) {  
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
        this.resultado = this.val1 + this.val2 + this.val3;

        if(this.resultado < this.total){
          this.apiService.addDocumento(this.coleccion, {
            grupo: form.value.grupo,
            tema: form.value.tema,
            asistieron: form.value.asistieron,
            nuevos: form.value.nuevos,
            convertidos: form.value.convertidos,
            reconciliados: form.value.reconciliados,
            ofrendas: form.value.ofrendas,
            observaciones: form.value.observaciones,
            fecha: form.value.fecha
          }).then(respuesta => {
            this.notificationsService.showSwal('Creado', 'El reporte ha sido creada con éxito', 'success');
            form.resetForm();
          }).catch(error => {
            console.log(error);
            this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
          });
        }else{
          this.notificationsService.showSwal('Ha ocurrido un error', 'La sumatoria de nuevos, convertidos y reconciliados no puede ser mayor a la cantidad que asistieron', 'error');
        }

      }
    });
  }

}

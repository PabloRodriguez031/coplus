import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-red', 
  templateUrl: './red.component.html',
  styleUrls: ['./red.component.css']
})
export class RedComponent implements OnInit{
  documentos :any = []; 
  coleccion = 'red';

  iglesias :any = []; 

  documentos_filtrados :any = [];


  constructor(public apiService: ApiService, private router: Router, private notificationsService: NotificationsService ) { }

  ngOnInit() {
    firebase.firestore().collection('iglesia').onSnapshot((snapshot) => {
      this.iglesias = [] as any;
      snapshot.forEach(doc => {
          this.iglesias.push({
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
        this.documentos.forEach(red => {
        this.iglesias.forEach(iglesia => {
          if(red.data['iglesia'] === iglesia.id){
            red.data['iglesia_nombre'] = iglesia.data['nombre'];
          }
        });
      });
        this.documentos_filtrados = this.documentos.slice();
      });
    });  
  }

  deleteDocumento(documento) {        
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
        this.apiService.deleteDocumento(this.coleccion, documento).then(respuesta => {
          this.notificationsService.showSwal('Borrado', 'La red ha sido borrada con éxito', 'success');          
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        });
      }
    });  
  }

  editDocumento(documento) {
    this.router.navigate(['/editar-red',documento.id])
  }

  filtro_iglesia(evento){
    console.log(evento);
    if(evento.target.value == 1){
      this.documentos_filtrados = this.documentos.slice();
    }else{
      this.documentos_filtrados = this.documentos.filter(red => {
        return red.data['iglesia'] === evento.target.value;
      });
    }
  }

}

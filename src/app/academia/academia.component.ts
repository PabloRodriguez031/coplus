import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-academia',
  templateUrl: './academia.component.html',
  styleUrls: ['./academia.component.css']
})
export class AcademiaComponent implements OnInit {

  documentos :any = []; 
  coleccion = 'academia';

  redes :any = [];

  constructor(public apiService: ApiService, private router: Router, private notificationsService: NotificationsService ) { }

  ngOnInit() {

    firebase.firestore().collection('red').onSnapshot((snapshot) => {
      this.redes = [] as any;
      snapshot.forEach(doc => {
          this.redes.push({
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
        this.documentos.forEach(academia => {
        this.redes.forEach(red => {
          if(academia.data['red'] === red.id){
            academia.data['red_nombre'] = red.data['descripcion'];
          }
        });
      });
      });
    }); 
  }

  deleteDocumento(documento) {        
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
        this.apiService.deleteDocumento(this.coleccion, documento).then(respuesta => {          
          this.notificationsService.showSwal('Borrado', 'El discipulado ha sido borrado con éxito', 'success');
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        });
      }
    });  
  }

  editDocumento(documento) {
    this.router.navigate(['/editar-academia',documento.id])
  }

  ingresarNotas(documento){
    this.router.navigate(['/ingreso-notas',documento.id])
  }

  agregarUsuario(documento){
    this.router.navigate(['/agregar-usuario-academia',documento.id])
  }

}

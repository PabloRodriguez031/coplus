import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-discipulado',
  templateUrl: './discipulado.component.html',
  styleUrls: ['./discipulado.component.css']
})
export class DiscipuladoComponent implements OnInit {

  documentos :any = []; 
  coleccion = 'discipulado';

  constructor(public apiService: ApiService, private router: Router, private notificationsService: NotificationsService ) { }

  ngOnInit() {
    firebase.firestore().collection(this.coleccion).onSnapshot((snapshot) => {
      this.documentos = [] as any;
      snapshot.forEach(doc => {
          this.documentos.push({
              id: doc.id,
              data: doc.data()
          });
      });
    });
  }

  deleteDocumento(documento) {        
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
        this.apiService.deleteDocumento(this.coleccion, documento);
        this.notificationsService.showSwal('Borrado', 'El discipulado ha sido borrado con éxito', 'success');
      }
    });  
  }

  editDocumento(documento) {
    this.router.navigate(['/editar-discipulado',documento.id])
  }

}

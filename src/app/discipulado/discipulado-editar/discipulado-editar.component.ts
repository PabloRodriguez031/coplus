import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api.service';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-discipulado-editar',
  templateUrl: './discipulado-editar.component.html',
  styleUrls: ['./discipulado-editar.component.css']
})
export class DiscipuladoEditarComponent implements OnInit {

  documento = [] as any;
  coleccion = 'discipulado';

  documentos2 = {} as any;
  coleccion2 = 'red';

  discipulados = [] as any;


  constructor(private route: ActivatedRoute, private apiService: ApiService, private notificationsService: NotificationsService) { }

  ngOnInit() {

    this.notificationsService.showLoadingSwal('Cargando datos...', 'Espere por favor');
    
    const documentoId = this.route.snapshot.params['id']
    this.apiService.getDocumentoById(this.coleccion, documentoId).then(documento => {
        this.documento = {
          id: documento.id,
          data: documento.data()
        };
        this.notificationsService.hideLoadingSwal();
      }).catch(error =>{
        console.log(error);
        this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
      });

      firebase.firestore().collection(this.coleccion2).onSnapshot((snapshot) => {
        this.documentos2 = [] as any;
        snapshot.forEach(doc => {
            this.documentos2.push({
                id: doc.id,
                data: doc.data()
            });
        });
      });

      
      firebase.firestore().collection('discipulado').onSnapshot((snapshot) => {
        this.discipulados = [] as any;
        snapshot.forEach(doc => {
            this.discipulados.push({
                id: doc.id,
                data: doc.data()
            });
        });
      });
    }

    updateDocumento(){      
      this.notificationsService.showConfirmationSwal().then(resultado => {
        if(resultado.value){
          this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
          this.apiService.updateDocumento(this.coleccion, {
            discipulado: this.documento.data['discipulado'],
            red: this.documento.data['red'],
            discipuladoPadre: this.documento.data['discipuladoPadre'],
            direccion: this.documento.data['direccion'],
            zona: this.documento.data['zona'],
            hora: this.documento.data['hora']
          }, this.documento.id).then(respuesta => {
            this.notificationsService.showSwal('Editado', 'La red ha sido editada con éxito', 'success');
          }).catch(error => {
            console.log(error);
            this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
          })
        }
      });
    }

}

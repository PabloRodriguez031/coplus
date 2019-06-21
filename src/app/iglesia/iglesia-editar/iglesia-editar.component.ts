import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api.service';
import { NotificationsService } from 'app/servicios/notifications.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-iglesia-editar',
  templateUrl: './iglesia-editar.component.html',
  styleUrls: ['./iglesia-editar.component.css']
})
export class IglesiaEditarComponent implements OnInit {

  documento = [] as any;
  coleccion = 'iglesia';

  documentos2 = [] as any;
  coleccion2 = 'usuario';

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
    }

    updateDocumento(){      
      this.notificationsService.showConfirmationSwal().then(resultado => {
        if(resultado.value){
          this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
          this.apiService.updateDocumento(this.coleccion, {
            nombre: this.documento.data['nombre'],
            encargadoIglesia: this.documento.data['encargadoIglesia']
          }, this.documento.id).then(respuesta => {
            this.notificationsService.showSwal('Editado', 'La iglesia ha sido editada con éxito', 'success');
          }).catch(error => {
            console.log(error);
            this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
          })
        }
      });
    }

}

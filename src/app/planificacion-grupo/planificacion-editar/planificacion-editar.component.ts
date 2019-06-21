import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api.service';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';


@Component({
  selector: 'app-planificacion-editar',
  templateUrl: './planificacion-editar.component.html',
  styleUrls: ['./planificacion-editar.component.css']
})
export class PlanificacionEditarComponent implements OnInit {

  documento = [] as any;
  coleccion = 'planificacion_grupo';

  documentos2 = {} as any;
  coleccion2 = 'predica';

  documentos3 = {} as any;
  coleccion3 = 'grupo';

  documentos4 = {} as any;
  coleccion4 = 'usuario';

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

      firebase.firestore().collection(this.coleccion3).onSnapshot((snapshot) => {
        this.documentos3 = [] as any;
        snapshot.forEach(doc => {
            this.documentos3.push({
                id: doc.id,
                data: doc.data()
            });
        });
      });

      firebase.firestore().collection(this.coleccion4).where("graduado", "==", "Si").onSnapshot((snapshot) => {
        this.documentos4 = [] as any;
        snapshot.forEach(doc => {
            this.documentos4.push({
                id: doc.id,
                data: doc.data()
            });
        });

        this.documentos4.forEach(usuario => {
          usuario.data['nombreCompleto'] = usuario.data['nombre'] + ' ' + usuario.data['apellido']
        })
      });
    }

    updateDocumento(){      
      this.notificationsService.showConfirmationSwal().then(resultado => {
        if(resultado.value){
          this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
          this.apiService.updateDocumento(this.coleccion, {
            tema: this.documento.data['tema'],
            fecha: this.documento.data['fecha'],
            grupo: this.documento.data['grupo'],
            predicador: this.documento.data['predicador'],
            bienvenida_vision: this.documento.data['bienvenida_vision'],
            ofrenda: this.documento.data['ofrenda']
          }, this.documento.id).then(respuesta => {
            this.notificationsService.showSwal('Editado', 'La planificacion ha sido editada con éxito', 'success');
          }).catch(error => {
            console.log(error);
            this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
          })
        }
      });
    }

}

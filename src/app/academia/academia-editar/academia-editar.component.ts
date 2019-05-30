import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api.service';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-academia-editar',
  templateUrl: './academia-editar.component.html',
  styleUrls: ['./academia-editar.component.css']
})
export class AcademiaEditarComponent implements OnInit {

  documento = [] as any;
  coleccion = 'academia';

  documentos2 = {} as any;
  coleccion2 = 'red';

  documentos3 = {} as any;
  coleccion3 = 'pensum';

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
    }

    updateDocumento(){      
      this.notificationsService.showConfirmationSwal().then(resultado => {
        if(resultado.value){
          this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
          this.apiService.updateDocumento(this.coleccion, {
            red: this.documento.data['red'],
            dia: this.documento.data['dia'],
            direccion: this.documento.data['direccion'],
            zona: this.documento.data['zona'],
            hora: this.documento.data['hora'],
            ciclo: this.documento.data['ciclo'],
            anio: this.documento.data['anio'],
            pensum: this.documento.data['pensum']
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

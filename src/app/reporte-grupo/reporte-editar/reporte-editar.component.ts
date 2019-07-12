import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api.service';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-reporte-editar',
  templateUrl: './reporte-editar.component.html',
  styleUrls: ['./reporte-editar.component.css']
})
export class ReporteEditarComponent implements OnInit {

  documento = [] as any;
  coleccion = 'reporte_grupo';

  documentos2 = {} as any;
  coleccion2 = 'predica';

  documentos3 = {} as any;
  coleccion3 = 'grupo';

  documentos4 = {} as any;
  coleccion4 = 'usuario';

  total:number;

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

        firebase.firestore().collection(this.coleccion4).onSnapshot((snapshot) => {
          this.documentos4 = [] as any;
          snapshot.forEach(doc => {
              this.documentos4.push({
                  id: doc.id,
                  data: doc.data()
              });
          });
        });

      });
    }

    updateDocumento(){      
      this.notificationsService.showConfirmationSwal().then(resultado => {
        if(resultado.value){
          this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');

          this.total = this.documento.data['nuevos'] + this.documento.data['convertidos'] + this.documento.data['reconciliados'];
          
          if(this.total < this.documento.data['asistieron']){
            this.apiService.updateDocumento(this.coleccion, {
              grupo: this.documento.data['grupo'],
              tema: this.documento.data['tema'],
              asistieron: this.documento.data['asistieron'],
              nuevos: this.documento.data['nuevos'],
              convertidos: this.documento.data['convertidos'],
              reconciliados: this.documento.data['reconciliados'],
              ofrendas: this.documento.data['ofrendas'],
              observaciones: this.documento.data['observaciones'],
            }, this.documento.id).then(respuesta => {
              this.notificationsService.showSwal('Editado', 'El reporte ha sido editado con éxito', 'success');
            }).catch(error => {
              console.log(error);
              this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
            })
          }else{
            this.notificationsService.showSwal('Ha ocurrido un error', 'La sumatoria de nuevos, convertidos y reconciliados no puede ser mayor a la cantidad que asistieron', 'error');
          }
          
        }
      });
    }
}

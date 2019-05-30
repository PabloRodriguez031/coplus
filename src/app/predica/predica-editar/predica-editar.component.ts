import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api.service';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-predica-editar',
  templateUrl: './predica-editar.component.html',
  styleUrls: ['./predica-editar.component.css']
})
export class PredicaEditarComponent implements OnInit {

  documento = [] as any;
  coleccion = 'predica';

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
    }

    updateDocumento(){      
      this.notificationsService.showConfirmationSwal().then(resultado => {
        if(resultado.value){
          this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
          this.apiService.updateDocumento(this.coleccion, {
            nombre: this.documento.data['nombre'],
            mes: this.documento.data['mes'],
            semana: this.documento.data['semana'],
            versiculos: this.documento.data['versiculos']
          }, this.documento.id).then(respuesta => {
            this.notificationsService.showSwal('Editado', 'La predica ha sido editada con éxito', 'success');
          }).catch(error => {
            console.log(error);
            this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
          })
        }
      });
    }

}

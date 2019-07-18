import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-pensum',
  templateUrl: './pensum.component.html',
  styleUrls: ['./pensum.component.css']
})
export class PensumComponent implements OnInit {

  pensum = [] as any;  

  constructor(private route: ActivatedRoute, private apiService: ApiService, private notificationsService: NotificationsService) { }

  ngOnInit() {

    this.notificationsService.showLoadingSwal('Cargando datos...', 'Espere por favor');
    
    const documentoId = this.route.snapshot.params['id']
    this.apiService.getDocumentoById('pensum', 'pensum').then(pensum => {
        this.pensum = {
          id: pensum.id,
          data: pensum.data()
        };
        this.notificationsService.hideLoadingSwal();
      }).catch(error =>{
        console.log(error);
        this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
      });
                
    }

    updateModuloI(){      
      this.notificationsService.showConfirmationSwal().then(resultado => {
        if(resultado.value){
          this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
          this.apiService.updateDocumento('pensum', {
            actividad_semana1_modulo1: this.pensum.data['actividad_semana1_modulo1'],
            desc_actividad_semana1_modulo1: this.pensum.data['desc_actividad_semana1_modulo1'],
            tema_semana1_modulo1: this.pensum.data['tema_semana1_modulo1'],
            desc_tema_semana1_modulo1: this.pensum.data['desc_tema_semana1_modulo1'],
            dinamica_semana1_modulo1: this.pensum.data['dinamica_semana1_modulo1'],
            desc_dinamica_semana1_modulo1: this.pensum.data['desc_dinamica_semana1_modulo1'],
            convivencia_semana1_modulo1: this.pensum.data['convivencia_semana1_modulo1'],

            actividad_semana2_modulo1: this.pensum.data['actividad_semana2_modulo1'],
            desc_actividad_semana2_modulo1: this.pensum.data['desc_actividad_semana2_modulo1'],
            tema_semana2_modulo1: this.pensum.data['tema_semana2_modulo1'],
            desc_tema_semana2_modulo1: this.pensum.data['desc_tema_semana2_modulo1'],
            dinamica_semana2_modulo1: this.pensum.data['dinamica_semana2_modulo1'],
            desc_dinamica_semana2_modulo1: this.pensum.data['desc_dinamica_semana2_modulo1'],
            convivencia_semana2_modulo1: this.pensum.data['convivencia_semana2_modulo1'],

            actividad_semana3_modulo1: this.pensum.data['actividad_semana3_modulo1'],
            desc_actividad_semana3_modulo1: this.pensum.data['desc_actividad_semana3_modulo1'],
            tema_semana3_modulo1: this.pensum.data['tema_semana3_modulo1'],
            desc_tema_semana3_modulo1: this.pensum.data['desc_tema_semana3_modulo1'],
            dinamica_semana3_modulo1: this.pensum.data['dinamica_semana3_modulo1'],
            desc_dinamica_semana3_modulo1: this.pensum.data['desc_dinamica_semana3_modulo1'],
            convivencia_semana3_modulo1: this.pensum.data['convivencia_semana3_modulo1'],

            actividad_semana4_modulo1: this.pensum.data['actividad_semana4_modulo1'],
            desc_actividad_semana4_modulo1: this.pensum.data['desc_actividad_semana4_modulo1'],
            tema_semana4_modulo1: this.pensum.data['tema_semana4_modulo1'],
            desc_tema_semana4_modulo1: this.pensum.data['desc_tema_semana4_modulo1'],
            dinamica_semana4_modulo1: this.pensum.data['dinamica_semana4_modulo1'],
            desc_dinamica_semana4_modulo1: this.pensum.data['desc_dinamica_semana4_modulo1'],
            convivencia_semana4_modulo1: this.pensum.data['convivencia_semana4_modulo1'],

            actividad_semana5_modulo1: this.pensum.data['actividad_semana5_modulo1'],
            desc_actividad_semana5_modulo1: this.pensum.data['desc_actividad_semana5_modulo1'],
            tema_semana5_modulo1: this.pensum.data['tema_semana5_modulo1'],
            desc_tema_semana5_modulo1: this.pensum.data['desc_tema_semana5_modulo1'],
            dinamica_semana5_modulo1: this.pensum.data['dinamica_semana5_modulo1'],
            desc_dinamica_semana5_modulo1: this.pensum.data['desc_dinamica_semana5_modulo1'],
            convivencia_semana5_modulo1: this.pensum.data['convivencia_semana5_modulo1'],

            actividad_semana6_modulo1: this.pensum.data['actividad_semana6_modulo1'],
            desc_actividad_semana6_modulo1: this.pensum.data['desc_actividad_semana6_modulo1'],
            tema_semana6_modulo1: this.pensum.data['tema_semana6_modulo1'],
            desc_tema_semana6_modulo1: this.pensum.data['desc_tema_semana6_modulo1'],
            dinamica_semana6_modulo1: this.pensum.data['dinamica_semana6_modulo1'],
            desc_dinamica_semana6_modulo1: this.pensum.data['desc_dinamica_semana6_modulo1'],
            convivencia_semana6_modulo1: this.pensum.data['convivencia_semana6_modulo1'],

            actividad_semana7_modulo1: this.pensum.data['actividad_semana7_modulo1'],
            desc_actividad_semana7_modulo1: this.pensum.data['desc_actividad_semana7_modulo1'],
            tema_semana7_modulo1: this.pensum.data['tema_semana7_modulo1'],
            desc_tema_semana7_modulo1: this.pensum.data['desc_tema_semana7_modulo1'],
            dinamica_semana7_modulo1: this.pensum.data['dinamica_semana7_modulo1'],
            desc_dinamica_semana7_modulo1: this.pensum.data['desc_dinamica_semana7_modulo1'],
            convivencia_semana7_modulo1: this.pensum.data['convivencia_semana7_modulo1'],

            actividad_semana8_modulo1: this.pensum.data['actividad_semana8_modulo1'],
            desc_actividad_semana8_modulo1: this.pensum.data['desc_actividad_semana8_modulo1'],
            tema_semana8_modulo1: this.pensum.data['tema_semana8_modulo1'],
            desc_tema_semana8_modulo1: this.pensum.data['desc_tema_semana8_modulo1'],
            dinamica_semana8_modulo1: this.pensum.data['dinamica_semana8_modulo1'],
            desc_dinamica_semana8_modulo1: this.pensum.data['desc_dinamica_semana8_modulo1'],
            convivencia_semana8_modulo1: this.pensum.data['convivencia_semana8_modulo1']
          }, this.pensum.id).then(respuesta => {
            this.notificationsService.showSwal('Editado', 'La red ha sido editada con éxito', 'success');
          }).catch(error => {
            console.log(error);
            this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
          })
        }
      });
    }

}

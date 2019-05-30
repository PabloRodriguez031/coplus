import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api.service';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  usuariosAcademia :any = [];
  coleccion = 'usuario';

  documentos2 :any = []; 
  coleccion2 = 'academia';

  documentoId;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.documentoId = this.route.snapshot.params['id'];
    this.apiService.getDocumentoById(this.coleccion2, this.documentoId).then(academia => {
      this.documentos2 = {
        id: academia.id,
        data: academia.data()
      };
    });

    firebase.firestore().collection(this.coleccion).where('estudiantesIds', '==', this.documentoId).onSnapshot((snapshot) => {
      this.usuariosAcademia = [] as any;
      snapshot.forEach(doc => {
          this.usuariosAcademia.push({
              id: doc.id,
              data: doc.data()
          });
        });
    });
  }

  ingresarNota(id, nota) {  
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');

        const indice = this.documentos2.data['estudiantes'].findIndex(estudiante =>{
          return estudiante.id === id;
        })

        if(!this.documentos2.data['estudiantes'][indice]['notas']){
          this.documentos2.data['estudiantes'][indice]['notas'] = []
        }

        this.documentos2.data['estudiantes'][indice]['notas'][0] = {
          id: 'prueba',
          nota: nota
        }

        this.apiService.updateDocumento('academia', { 
          estudiantes: this.documentos2.data['estudiantes']
        }, this.documentoId).then(respuesta => {        
          this.notificationsService.showSwal('Editado', 'La nota ha sido ingresada con éxito', 'success');
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        })

      }
    });
  }

}

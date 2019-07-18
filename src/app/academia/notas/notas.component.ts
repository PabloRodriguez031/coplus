import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api.service';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';
import { Router } from '@angular/router';


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

  pensum :any = []; 

  notas = [];

  documentoId;

  constructor( private router: Router, private route: ActivatedRoute, private apiService: ApiService, private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.documentoId = this.route.snapshot.params['id'];
    this.apiService.getDocumentoById(this.coleccion2, this.documentoId).then(academia => {
      this.documentos2 = {
        id: academia.id,
        data: academia.data()
      };

      this.documentos2.data['estudiantes'].forEach(estudiante => {
        console.log('estudiantes', estudiante.notas[0]);
      })

      firebase.firestore().collection('pensum').onSnapshot((snapshot) => {
        this.pensum = [] as any;
        snapshot.forEach(pensum => {
            this.pensum.push({
                id: pensum.id,
                data: pensum.data()
            });
          });

          
      });

      firebase.firestore().collection(this.coleccion).onSnapshot((snapshot) => {
        this.usuariosAcademia = [] as any;
        snapshot.forEach(doc => {
            this.usuariosAcademia.push({
                id: doc.id,
                data: doc.data()
            });
          });

          this.documentos2.data['estudiantes'].forEach( estudiante => {
            this.usuariosAcademia.forEach( usuario => {
              if(estudiante.id_estudiante === usuario.id){
                estudiante.nombreCompleto = usuario.data['nombre'] + ' ' + usuario.data['apellido']
              }
            })
          })
      });

    });


    
  }

  updateNotaModuloI(id, nota1){
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');

        if(!this.documentos2.data['estudiantes']){
          this.documentos2.data['estudiantes'] = []
        }

        const indice = this.documentos2.data['estudiantes'].findIndex(estudiante =>{
          return estudiante.id_estudiante === id;
        })

        if(!this.documentos2.data['estudiantes'][indice]['notas']){
          this.documentos2.data['estudiantes'][indice]['notas'] = []
        }

        this.documentos2.data['estudiantes'][indice]['notas'][0] = {
          id_estudiante: id,
          nota1_modulo1: nota1
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

  ingresarNota(id, modulo1, modulo2, modulo3, modulo4) {  
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');

        if(!this.documentos2.data['estudiantes']){
          this.documentos2.data['estudiantes'] = []
        }

        const indice = this.documentos2.data['estudiantes'].findIndex(estudiante =>{
          return estudiante.id_estudiante === id;
        })

        if(!this.documentos2.data['estudiantes'][indice]['notas']){
          this.documentos2.data['estudiantes'][indice]['notas'] = []
        }

        this.documentos2.data['estudiantes'][indice]['notas'][0] = {
          id_estudiante: id,
          modulo1: modulo1,
          modulo2: modulo2,
          modulo3: modulo3,
          modulo4: modulo4,
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

  moduloI(){
    this.router.navigate(['/moduloI',this.documentoId])
  }

}

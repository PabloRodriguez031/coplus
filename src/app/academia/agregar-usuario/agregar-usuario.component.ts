import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { ApiService } from 'app/servicios/api.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'app/servicios/notifications.service';
import { Subject } from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import { environment } from 'environments/environment';

declare const $: any;

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<boolean> = new Subject();
  dtTrigger2: Subject<boolean> = new Subject();
  dtTrigger3: Subject<boolean> = new Subject();
  dtTrigger4: Subject<boolean> = new Subject();

  lideresAcademia:any = [];
  usuariosAcademia :any = [];

  documentos :any = []; 
  coleccion = 'usuario';

  documentos2 :any = []; 
  coleccion2 = 'academia';

  lideresRed :any = []; 
  usuariosRed :any = []; 

  lider :any = [];

  documentoId;

  isLoading = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private notificationsService: NotificationsService) { }

  ngOnInit() {

    this.documentoId = this.route.snapshot.params['id'];
    this.apiService.getDocumentoById(this.coleccion2, this.documentoId).then(academia => {
      this.documentos2 = {
        id: academia.id,
        data: academia.data()
      };
    });

    firebase.firestore().collection(this.coleccion).where('liderAcademiaId', '==', this.documentoId).
    where('graduado', '==', 'Si').onSnapshot((snapshot) => {
      this.lideresAcademia = [] as any;
      snapshot.forEach(lideresAcademia => {
          this.lideresAcademia.push({
              id: lideresAcademia.id,
              data: lideresAcademia.data()
          });
        });      
    });

    firebase.firestore().collection(this.coleccion).where('estudiantesIds', '==', this.documentoId).
    where('graduado', '==', 'No').onSnapshot((snapshot) => {
      this.usuariosAcademia = [] as any;
      snapshot.forEach(usuariosAcademia => {
          this.usuariosAcademia.push({
              id: usuariosAcademia.id,
              data: usuariosAcademia.data()
          });
        });
      
    });
  }

  openForm() {

    this.dtOptions = environment.dtOptions;
    this.isLoading = true;

    firebase.firestore().collection('usuario').where('graduado', '==', 'Si').
    where('red', '==', this.documentos2.data['red']).onSnapshot((snapshot) => {
      this.lideresRed = [] as any;
      snapshot.forEach(doc => {
          this.lideresRed.push({
              id: doc.id,
              data: doc.data()
          });
        });

        if(this.isLoading){
          this.isLoading = false;
          this.dtTrigger.next(false);  
        }else{
          this.rerenderDatatable();
        }  
      
        $('#formModal').modal('toggle');
    });  
  }

  agregarLider(id){      
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
        if(!this.documentos2.data['lideresIds']){
          this.documentos2.data['lideresIds'] = [];
        }
        this.documentos2.data['lideresIds'].push(id);
        this.apiService.updateDocumento(this.coleccion2, { 
          lideresIds: this.documentos2.data['lideresIds']
        }, this.documentoId).then(respuesta => {

          this.lideresRed.splice(this.lideresRed.findIndex(lider => {
            return lider.id === id;
          }),1);

          this.notificationsService.showSwal('Editado', 'El lider ha sido agregado con éxito', 'success');
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        })

        this.apiService.updateDocumento(this.coleccion, { 
          liderAcademiaId: this.documentos2.id
        }, id).then(respuesta => {
          this.usuariosRed.splice(this.usuariosRed.findIndex(discipulo => {
            return discipulo.id === id;
          }),1);
          
          this.notificationsService.showSwal('Editado', 'El lider ha sido agregado con éxito', 'success');
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        })

      }
    });
  }

  deleteLider(id, index){
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){

        this.lideresAcademia.splice(index, 1);

        let lideresRestantes = [];

        this.lideresAcademia.forEach(lideres =>{
          lideresRestantes.push(lideres.id)
        })

        this.apiService.updateDocumento(this.coleccion, { 
          liderAcademiaId: ''
        }, id).then(respuesta => {
          this.apiService.updateDocumento('academia', {
            lideresIds: lideresRestantes
          }, this.documentoId)
          
          this.notificationsService.showSwal('Editado', 'El lider ha sido eliminado con éxito', 'success');
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        })

      }
    });
  }

  openForm2() {
    firebase.firestore().collection('usuario').where('red', '==', this.documentos2.data['red']).
    where('graduado', '==', 'No').
    where('estudiantesIds', '==', '').
    onSnapshot((snapshot) => {
      this.usuariosRed = [] as any;
      snapshot.forEach(doc => {
          this.usuariosRed.push({
              id: doc.id,
              data: doc.data()
          });
        });

        if(this.isLoading){
          this.isLoading = false;
          this.dtTrigger.next(false);  
        }else{
          this.rerenderDatatable();
        }  

        $('#formModal2').modal('toggle');
    });
  }

  agregarUsuario(id){
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');

        if(!this.documentos2.data['estudiantes']){
          this.documentos2.data['estudiantes'] = [];
        }        
        this.documentos2.data['estudiantes'].push({
          id: id
        });
        this.apiService.updateDocumento(this.coleccion2, { 
          estudiantesIds: this.documentos2.data['estudiantes'],
          estudiantes: this.documentos2.data['estudiantes']
        }, this.documentoId).then(respuesta => {
          this.usuariosRed.splice(this.usuariosRed.findIndex(discipulo => {
            return discipulo.id === id;
          }),1);
          
          this.notificationsService.showSwal('Editado', 'El usuario ha sido agregado con éxito', 'success');
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        })
        
        this.apiService.updateDocumento(this.coleccion, { 
          estudiantesIds: this.documentos2.id
        }, id).then(respuesta => {
          this.usuariosRed.splice(this.usuariosRed.findIndex(discipulo => {
            return discipulo.id === id;
          }),1);
          
          this.notificationsService.showSwal('Editado', 'El usuario ha sido agregado con éxito', 'success');
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        })
      }
    });
  }

  deleteUsuario(id, index){
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        
        this.usuariosAcademia.splice(index, 1);

        let usuariosRestantes = [];

        this.usuariosAcademia.forEach(usuarios => {
          usuariosRestantes.push(usuarios.id)
        })

        this.apiService.updateDocumento(this.coleccion, { 
          estudiantesIds: ''
        }, id).then(respuesta => {
          this.apiService.updateDocumento('academia', {
            estudiantesIds: usuariosRestantes
          }, this.documentoId)
          
          this.notificationsService.showSwal('Editado', 'El estudiante ha sido eliminado con éxito', 'success');
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        })

      }
    });
  }

  rerenderDatatable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
        this.dtTrigger2.next();
        this.dtTrigger3.next();
        this.dtTrigger4.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dtTrigger2.unsubscribe();
    this.dtTrigger3.unsubscribe();
    this.dtTrigger4.unsubscribe();
  }


}

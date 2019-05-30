import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ApiService } from 'app/servicios/api.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'app/servicios/notifications.service';


declare const $: any;

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {

  lideresDiscipulado :any = [];
  usuariosDiscipulado :any = [];

  documentos :any = []; 
  coleccion = 'usuario';

  documentos2 :any = []; 
  coleccion2 = 'discipulado';

  lideresRed :any = []; 
  usuariosRed :any = []; 

  lider :any = [];

  documentoId;

  
  constructor(private apiService: ApiService, private route: ActivatedRoute, private notificationsService: NotificationsService) { }
  

  ngOnInit() {
    this.documentoId = this.route.snapshot.params['id'];
    this.apiService.getDocumentoById(this.coleccion2, this.documentoId).then(discipulado => {
      this.documentos2 = {
        id: discipulado.id,
        data: discipulado.data()
      };
      
      if(this.lideresRed){
        this.lideresRed = this.filtrarUsuarios(this.lideresRed, 'lideresIds');
      }
      if(this.usuariosRed){
        this.usuariosRed = this.filtrarUsuarios(this.usuariosRed, 'discipulosIds');
      }
    });


    firebase.firestore().collection(this.coleccion).where('liderDiscipuladoId', '==', this.documentoId).
    where('graduado', '==', 'Si').onSnapshot((snapshot) => {
      this.lideresDiscipulado = [] as any;
      snapshot.forEach(lideresDiscipulado => {
          this.lideresDiscipulado.push({
              id: lideresDiscipulado.id,
              data: lideresDiscipulado.data()
          });
        });
    });

    firebase.firestore().collection(this.coleccion).where('discipuloId', '==', this.documentoId).
    onSnapshot((snapshot) => {
      this.usuariosDiscipulado = [] as any;
      snapshot.forEach(usuariosDiscipulado => {
          this.usuariosDiscipulado.push({
              id: usuariosDiscipulado.id,
              data: usuariosDiscipulado.data()
          });
        });
    });

  }

  openForm() {
    firebase.firestore().collection('usuario').where('graduado', '==', 'Si').
    where('red', '==', this.documentos2.data['red']).
    where('liderDiscipuladoId', '==', '').
    where('discipuloId', '==', '').
  onSnapshot((snapshot) => {
      this.lideresRed = [] as any;
      snapshot.forEach(doc => {
          this.lideresRed.push({
              id: doc.id,
              data: doc.data()
          });
        });
        this.lideresRed = this.filtrarUsuarios(this.lideresRed, 'lideresIds');
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
          liderDiscipuladoId: this.documentos2.id
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

        this.lideresDiscipulado.splice(index, 1);

        let lideresRestantes = [];

        this.lideresDiscipulado.forEach(lideres => {
          lideresRestantes.push(lideres.id)
        })

        this.apiService.updateDocumento(this.coleccion, { 
          liderDiscipuladoId: ''
        }, id).then(respuesta => {
          this.apiService.updateDocumento('discipulado', {
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

  filtrarUsuarios(usuarios, campo){
    const usuariosfiltrados = [];    
    usuarios.forEach(usuario => {
      let existe = false;
      this.documentos2.data[campo].forEach(discipulo =>{
        if(usuario.id === discipulo){
          existe = true;
        }
      });      
      if(existe === false){
        usuariosfiltrados.push(usuario);
      }
    });
    console.log(usuarios);
    return usuariosfiltrados;
  }

  openForm2() {
    firebase.firestore().collection('usuario').where('red', '==', this.documentos2.data['red']).
    where('graduado', '==', 'Si').
    where('discipuloId', '==', '').
    onSnapshot((snapshot) => {
      this.usuariosRed = [] as any;
      snapshot.forEach(doc => {
          this.usuariosRed.push({
              id: doc.id,
              data: doc.data()
          });
        });
        this.filtrarUsuarios(this.usuariosRed, 'discipulosIds');
        $('#formModal2').modal('toggle');
    });
  }

  agregarUsuario(id){
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');

        if(!this.documentos2.data['discipulosIds']){
          this.documentos2.data['discipulosIds'] = [];
        }        
        
        this.documentos2.data['discipulosIds'].push(id);
        this.apiService.updateDocumento(this.coleccion2, { 
          discipulosIds: this.documentos2.data['discipulosIds']
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
          discipuloId: this.documentos2.id
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

        this.usuariosDiscipulado.splice(index, 1);

        let usuariosRestantes = []

        this.usuariosDiscipulado.forEach(usuarios => {
          usuariosRestantes.push(usuarios.id)
        })
        
        this.apiService.updateDocumento(this.coleccion, { 
          discipuloId: ''
        }, id).then(respuesta => {
          this.apiService.updateDocumento('discipulado', {
            discipulosIds: usuariosRestantes
          }, this.documentoId)
          
          this.notificationsService.showSwal('Editado', 'El lider ha sido eliminado con éxito', 'success');
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        })

      }
    });
  }
}



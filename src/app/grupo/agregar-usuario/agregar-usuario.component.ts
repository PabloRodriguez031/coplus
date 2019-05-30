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

  lideresGrupo:any = [];
  usuariosGrupo :any = [];

  documentos :any = []; 
  coleccion = 'usuario';

  documentos2 :any = []; 
  coleccion2 = 'grupo';

  lideresRed :any = []; 
  usuariosRed :any = []; 

  lider :any = [];

  documentoId;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.documentoId = this.route.snapshot.params['id'];
    this.apiService.getDocumentoById(this.coleccion2, this.documentoId).then(academia => {
      this.documentos2 = {
        id: academia.id,
        data: academia.data()
      };
    });

    if(this.lideresRed){
      this.lideresRed = this.filtrarUsuarios(this.lideresRed, 'lideresIds');
    }
    if(this.usuariosRed){
      this.usuariosRed = this.filtrarUsuarios(this.usuariosRed, 'gruposIds');
    }


    firebase.firestore().collection(this.coleccion).where('liderGrupoId', '==', this.documentoId).
    where('graduado', '==', 'Si').onSnapshot((snapshot) => {
      this.lideresGrupo = [] as any;
      snapshot.forEach(lideresGrupo => {
          this.lideresGrupo.push({
              id: lideresGrupo.id,
              data: lideresGrupo.data()
          });
        });
    });

    firebase.firestore().collection(this.coleccion).where('grupoId', '==', this.documentoId).
    onSnapshot((snapshot) => {
      this.usuariosGrupo = [] as any;
      snapshot.forEach(usuariosGrupo => {
          this.usuariosGrupo.push({
              id: usuariosGrupo.id,
              data: usuariosGrupo.data()
          });
        });
    });
  }

  openForm() {
    firebase.firestore().collection('usuario').where('graduado', '==', 'Si').
    where('red', '==', this.documentos2.data['red']).
    where('liderGrupoId', '==', '').
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
          liderGrupoId: this.documentos2.id
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

        this.lideresGrupo.splice(index, 1);

        let lideresRestantes = [];

        this.lideresGrupo.forEach(lideres => {
          lideresRestantes.push(lideres.id)
        })

        this.apiService.updateDocumento(this.coleccion, { 
          liderGrupoId: ''
        }, id).then(respuesta => {
          this.apiService.updateDocumento('grupo', {
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
    where('graduado', '==', 'No').
    where('grupoId', '==', '').
    onSnapshot((snapshot) => {
      this.usuariosRed = [] as any;
      snapshot.forEach(doc => {
          this.usuariosRed.push({
              id: doc.id,
              data: doc.data()
          });
        });
        this.filtrarUsuarios(this.usuariosRed, 'gruposIds');
        $('#formModal2').modal('toggle');
    });
  }

  agregarUsuario(id){
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');

        if(!this.documentos2.data['gruposIds']){
          this.documentos2.data['gruposIds'] = [];
        }        
        this.documentos2.data['gruposIds'].push(id);
        this.apiService.updateDocumento(this.coleccion2, { 
          gruposIds: this.documentos2.data['gruposIds']
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
          grupoId: this.documentos2.id
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

        this.usuariosGrupo.splice(index, 1);

        let usuariosRestantes = [];

        this.usuariosGrupo.forEach(usuarios =>{
          usuariosRestantes.push(usuarios.id)
        })
        
        this.apiService.updateDocumento(this.coleccion, { 
          grupoId: ''
        }, id).then(respuesta => {
          this.apiService.updateDocumento('grupo', {
            gruposIds: usuariosRestantes
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

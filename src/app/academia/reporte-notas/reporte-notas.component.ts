import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api.service';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';
import { Subject } from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-reporte-notas',
  templateUrl: './reporte-notas.component.html',
  styleUrls: ['./reporte-notas.component.css']
})
export class ReporteNotasComponent implements OnInit {

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<boolean> = new Subject();

  documentoId;

  academias :any = [];
  usuarios :any = [];


  constructor(private route: ActivatedRoute, private apiService: ApiService, private notificationsService: NotificationsService) { }
  
  ngOnInit() {
    this.documentoId = this.route.snapshot.params['id'];
    this.apiService.getDocumentoById('academia', this.documentoId).then(academias => {
      this.academias = {
        id: academias.id,
        data: academias.data()
      };

      firebase.firestore().collection('usuario').onSnapshot((snapshot) => {
        this.usuarios = [] as any;
        snapshot.forEach(usuarios => {
            this.usuarios.push({
                id: usuarios.id,
                data: usuarios.data()
            });
          });     
          
          this.academias.data.estudiantes.forEach(estudiante => {
            this.usuarios.forEach(usuario => {
              if(estudiante.id === usuario.id){
                estudiante.nombreEstudiante = usuario.data['nombre'] + ' ' + usuario.data['apellido'];
              }
            })
          })
    


      });
    

    });

  }

}

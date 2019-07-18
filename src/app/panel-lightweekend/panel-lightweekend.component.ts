import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';
import { Subject } from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-panel-lightweekend',
  templateUrl: './panel-lightweekend.component.html',
  styleUrls: ['./panel-lightweekend.component.css']
})
export class PanelLightweekendComponent implements OnInit {

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<boolean> = new Subject();

  documentos :any = [];
  coleccion = 'light_weekend';

  redes :any = [];
  documento :any  = []


  isLoading = false;

  constructor(public apiService: ApiService, private router: Router, private notificationsService: NotificationsService ) { }

  ngOnInit() {

    this.dtOptions = environment.dtOptions;
    this.isLoading = true;

    firebase.firestore().collection('red').onSnapshot((snapshot) => {
      this.redes = [] as any;
      snapshot.forEach(doc => {
          this.redes.push({
              id: doc.id,
              data: doc.data()
          });
      });

      firebase.firestore().collection(this.coleccion).onSnapshot((snapshot) => {
        this.documentos = [] as any;
        snapshot.forEach(doc => {
            this.documentos.push({
                id: doc.id,
                data: doc.data()
            });
        });

        this.documentos.forEach(usuario => {
          if(usuario.data['pago'] === 'true'){
            usuario.data['pago'] = 'Ya pagó'
          }else{
            usuario.data['pago'] = 'Pendiente'
          }
        })

        this.documentos.forEach(grupo => {
        this.redes.forEach(red => {
          if(grupo.data['red'] === red.id){
            grupo.data['red_nombre'] = red.data['descripcion'];
           }
          });
        });

        if(this.isLoading){
          this.isLoading = false;
          this.dtTrigger.next(false);
        }else{
          this.rerenderDatatable();
        }

      });

    });
  }

  rerenderDatatable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
  }


  yaPago(id){
    this.notificationsService.showConfirmationSwal().then(resultado => {
      if(resultado.value){
        this.notificationsService.showLoadingSwal('Enviando datos...', 'Espere por favor');
        this.apiService.updateDocumento(this.coleccion, {
          pago: 'true'
        }, id).then(respuesta => {
          this.notificationsService.showSwal('Editado', 'Acción realizada con éxito', 'success');
        }).catch(error => {
          console.log(error);
          this.notificationsService.showSwal('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
        })
      }
    });
  }

  asignarColor(){
    // $('#formModal').modal('toggle');
  }

}

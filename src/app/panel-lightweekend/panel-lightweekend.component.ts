import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-panel-lightweekend',
  templateUrl: './panel-lightweekend.component.html',
  styleUrls: ['./panel-lightweekend.component.css']
})
export class PanelLightweekendComponent implements OnInit {

  documentos :any = []; 
  coleccion = 'light_weekend';

  redes :any = [];

  constructor(public apiService: ApiService, private router: Router, private notificationsService: NotificationsService ) { }

  ngOnInit() {

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
        
        this.documentos.forEach(grupo => {
        this.redes.forEach(red => {
          if(grupo.data['red'] === red.id){
            grupo.data['red_nombre'] = red.data['descripcion'];
           }
          });
        });
      });      

    }); 
  }

}

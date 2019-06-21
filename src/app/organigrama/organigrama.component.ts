import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { NotificationsService } from 'app/servicios/notifications.service';

@Component({
  selector: 'app-organigrama',
  templateUrl: './organigrama.component.html',
  styleUrls: ['./organigrama.component.css']
})
export class OrganigramaComponent implements OnInit {

  constructor(private route: ActivatedRoute, public apiService: ApiService, private router: Router, private notificationsService: NotificationsService) { }

  redes :any = [];
  discipulados :any = [];
  grupos :any = [];

  organigrama = [];


  ngOnInit() {
    firebase.firestore().collection('red').onSnapshot((snapshot) => {
      this.redes = [] as any;
      snapshot.forEach(doc => {
          this.redes.push({
              id: doc.id,
              data: doc.data()
          });
      });

      firebase.firestore().collection('discipulado').onSnapshot((snapshot) => {
        this.discipulados = [] as any;
        snapshot.forEach(doc => {
            this.discipulados.push({
                id: doc.id,
                data: doc.data()
            });
        });

        firebase.firestore().collection('grupo').onSnapshot((snapshot) => {
          this.grupos = [] as any;
          snapshot.forEach(doc => {
              this.grupos.push({
                  id: doc.id,
                  data: doc.data()
              });
          });

          this.organigrama = [];

          this.redes.forEach((red, index_red) => {
            const _red = [];
            _red.push(red);
            _red['discipulados'] = [];
  
            this.discipulados.forEach((discipulado, index_disc) => {
              if(discipulado.data['red'] === red.id && discipulado.data['discipuladoPadre'] === ''){
                  
                const _disc = [];
                _disc.push(discipulado);
                _disc['discipulados_hijos'] = [];
                _disc['grupos'] = [];
  
                this.discipulados.forEach((discipulado_hijo, index_disc_hijo) => {
                    
                  if(discipulado_hijo.data['discipuladoPadre'] === discipulado.id){
                    _disc['discipulados_hijos'].push(discipulado_hijo);
                    _disc['discipulados_hijos']['grupos'] = [];
                    _disc['discipulados_hijos']['discipulados_hijos'] = [];

                    this.grupos.forEach((grupo, index_grupo) => {                    
                      if(grupo.data['discipulado'] === discipulado_hijo.id ){                          
                        _disc['discipulados_hijos']['grupos'].push(grupo);
                      }
                    })

                    this.discipulados.forEach((discipulado_hijo2, index_disc_hijo) => {
                      if(discipulado_hijo2.data['discipuladoPadre'] === discipulado_hijo.id){
                        _disc['discipulados_hijos']['discipulados_hijos'].push(discipulado_hijo2);
                      }
                    })
                  }
                })
  
                this.grupos.forEach((grupo, index_grupo) => {                    
                  if(grupo.data['discipulado'] === discipulado.id ){                      
                    _disc['grupos'].push(grupo);
                  }
                })
  
                  _red['discipulados'].push(_disc);
                  
              }//termina if de discipulados
            })//terminara for each discipulados
             this.organigrama.push(_red);
          })//termina fro each redes
  
          console.log(this.organigrama);

        });//termina consulta grupos
      });
    });
  }
  
}



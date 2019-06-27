import {Component, OnInit} from '@angular/core';
import {ApiService} from '../servicios/api.service';
import {Router, ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
import {NotificationsService} from 'app/servicios/notifications.service';

@Component({
    selector: 'app-organigrama',
    templateUrl: './organigrama.component.html',
    styleUrls: ['./organigrama.component.css']
})
export class OrganigramaComponent implements OnInit {


    redes = [];
    discipulados = [];
    grupos = [];

    organigrama;

    constructor(private route: ActivatedRoute, public apiService: ApiService, private router: Router, private notificationsService: NotificationsService) {
    }


    ngOnInit() {
        firebase.firestore().collection('red').onSnapshot((snapshot) => {
            this.redes = [] as any;
            snapshot.forEach(doc => {
                this.redes.push({
                    id: doc.id,
                    data: doc.data()
                });
            });

            firebase.firestore().collection('discipulado').onSnapshot((snapshotDiscipulado) => {
                this.discipulados = [] as any;
                snapshotDiscipulado.forEach(doc => {
                    this.discipulados.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });

                firebase.firestore().collection('grupo').onSnapshot((snapshotGrupos) => {
                    this.grupos = [] as any;
                    snapshotGrupos.forEach(doc => {
                        this.grupos.push({
                            id: doc.id,
                            data: doc.data()
                        });
                    });


                    this.discipulados.forEach(discipulado => {
                        discipulado['data']['grupos'] = [];
                        this.grupos.forEach(grupo => {
                            if (grupo['data']['discipulado']) {
                                if (grupo['data']['discipulado'] === discipulado.id) {
                                    discipulado['data']['grupos'].push(grupo);
                                }
                            }
                        })
                    });


                    this.discipulados.forEach(discipulado => {
                        if (!discipulado['data']['discipulados']) {
                            discipulado['data']['discipulados'] = [];
                        }
                        this.discipulados.forEach(hijo => {
                            if (hijo['data']['discipuladoPadre']) {
                                if (hijo['data']['discipuladoPadre'] === discipulado.id) {
                                    hijo['data']['is_son'] = true;
                                    discipulado['data']['discipulados'].push(hijo);
                                }
                            }
                        });
                    });


                    this.discipulados = this.discipulados.filter(discipulado => {
                        return !discipulado['data']['is_son']
                    });


                    this.redes.forEach(red => {
                        red['data']['discipulados'] = [];
                        this.discipulados.forEach(discipulado => {
                            if (red.id === discipulado['data']['red']) {
                                red['data']['discipulados'].push(discipulado);
                            }
                        })
                    });
                    console.log(this.redes);
                    this.createOrganizationChart();
                });//termina consulta grupos
            });
        });
    }

    createOrganizationChart() {
        this.organigrama = '<ul>';

        this.redes.forEach(red => {
            this.organigrama += '<li>';

            this.organigrama += '<b>Red</b> - ' + red['data']['descripcion'];

            if (red['data']['discipulados'].length > 0) {
                red['data']['discipulados'].forEach(discipulado => {
                    this.createDiscipuladoUl(discipulado['data']);
                });
            }
            this.organigrama += '</li>';
        });
        this.organigrama += '</ul>';

        console.log(this.organigrama);
    }

    createDiscipuladoUl(discipulado) {

        this.organigrama += '<ul>';
        this.organigrama += '<b>Discipulado</b> - ' + discipulado['discipulado'];
        if (discipulado['discipulados']. length > 0) {
            discipulado['discipulados'].forEach(_discipulado => {
                this.createDiscipuladoUl(_discipulado['data']);
            });
        }

        if (discipulado['grupos'].length > 0) {
            this.organigrama += '<ul>';
            discipulado['grupos'].forEach(grupo => {
                this.organigrama += '<b>Grupo</b> - ' + grupo['data']['nombre'];
            });
            this.organigrama += '</ul>';
        }
        this.organigrama += `</ul>`;
    }

}
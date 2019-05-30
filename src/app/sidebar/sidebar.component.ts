import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    // icon: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'nc-icon nc-bank'
    },{
        path: '/iglesia',
        title: 'Iglesias',
        type: 'link',
        icontype: 'nc-icon nc-istanbul'
    },{
        path: '/red',
        title: 'Redes',
        type: 'link',
        icontype: 'nc-icon nc-book-bookmark'
    },{
        path: '/usuario',
        title: 'Usuarios',
        type: 'link',
        icontype: 'nc-icon nc-single-02'
    },{
        path: '/academia',
        title: 'Academia',
        type: 'link',
        icontype: 'nc-icon nc-hat-3'
    }
    ,{
        path: '/discipulado',
        title: 'Discipulados',
        type: 'link',
        icontype: 'nc-icon nc-badge'
    },{
        path: '/grupo',
        title: 'Grupos',
        type: 'link',
        icontype: 'nc-icon nc-shop'
    },{
        path: '/predica',
        title: 'Predicas',
        type: 'link',
        icontype: 'nc-icon nc-box'
    },{
        path: '/planificacion-grupo',
        title: 'Planificacion grupos',
        type: 'link',
        icontype: 'nc-icon nc-calendar-60'
    },{
        path: '/reporte-grupo',
        title: 'Reporte grupos',
        type: 'link',
        icontype: 'nc-icon nc-ruler-pencil'
    },{
        path: '/reporte-discipulado',
        title: 'Reporte discipulados',
        type: 'link',
        icontype: 'nc-icon nc-ruler-pencil'
    },{
        path: '/panel-lightweekend',
        title: 'Panel Lightweekend',
        type: 'link',
        icontype: 'nc-icon nc-bulb-63'
    },{
        path: '/lightweekend',
        title: 'Lightweekend',
        type: 'link',
        icontype: 'nc-icon nc-bulb-63'
    }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {
    public menuItems: any[];
    isNotMobileMenu(){
        if( window.outerWidth > 991){
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    ngAfterViewInit(){
    }
}

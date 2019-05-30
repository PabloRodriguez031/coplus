import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },{
        path: '',
        component: AdminLayoutComponent,
        children: [{
            path: '',
            loadChildren: './dashboard/dashboard.module#DashboardModule'
        },{
            path: '',
            loadChildren: './iglesia/iglesia.module#IglesiaModule'
        },{
            path: '',
            loadChildren: './red/red.module#RedModule'
        },{
            path: '',
            loadChildren: './usuario/usuario.module#UsuarioModule'
        },{
            path: '',
            loadChildren: './academia/academia.module#AcademiaModule'
        },{
            path: '',
            loadChildren: './discipulado/discipulado.module#DiscipuladoModule'
        },{
            path: '',
            loadChildren: './grupo/grupo.module#GrupoModule'
        },{
            path: '',
            loadChildren: './predica/predica.module#PredicaModule'
        },{
            path: '',
            loadChildren: './planificacion-grupo/planificacion-grupo.module#PlanificacionGrupoModule'
        },{
            path: '',
            loadChildren: './reporte-grupo/reporte-grupo.module#ReporteGrupoModule'
        },{
            path: '',
            loadChildren: './reporte-discipulado/reporte-discipulado.module#ReporteDiscipuladoModule'
        },{
            path: '',
            loadChildren: './panel-lightweekend/panel-lightweekend.module#PanellightweekendModule'
        },{
            path: '',
            loadChildren: './lightweekend/lightweekend.module#LightweekendModule'
        }]
        },{
            path: '',
            component: AuthLayoutComponent,
            children: [{
                path: 'pages',
                loadChildren: './pages/pages.module#PagesModule'
            }]
        }
];

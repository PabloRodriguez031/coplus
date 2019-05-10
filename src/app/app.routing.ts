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

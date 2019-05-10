import { Routes } from '@angular/router';

import { GrupoComponent } from './grupo.component';

export const GrupoRoutes: Routes = [{
    path: '',
    children: [{
        path: 'grupo',
        component: GrupoComponent
    }]
}];

import { Routes } from '@angular/router';

import { PredicaComponent } from './predica.component';
import { PredicaFormComponent } from './predica-form/predica-form.component';
import { PredicaEditarComponent } from './predica-editar/predica-editar.component';

export const PredicaRoutes: Routes = [{
    path: '',
    children: [{
        path: 'predica',
        component: PredicaComponent
    },{
        path: 'crear-predica',
        component: PredicaFormComponent
    },{
        path: 'editar-predica/:id',
        component: PredicaEditarComponent
    }]
}];

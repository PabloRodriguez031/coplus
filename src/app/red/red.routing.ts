import { Routes } from '@angular/router';

import { RedComponent } from './red.component';
import { RedFormComponent } from './red-form/red-form.component';
import { RedEditarComponent } from './red-editar/red-editar.component';

export const RedRoutes: Routes = [{
    path: '',
    children: [{
        path: 'red',
        component: RedComponent
    },{
        path: 'crear-red',
        component: RedFormComponent
    },{
        path: 'editar-red/:id',
        component: RedEditarComponent
    }]
}];

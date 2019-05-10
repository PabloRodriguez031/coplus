import { Routes } from '@angular/router';

import { IglesiaComponent } from './iglesia.component';
import { IglesiaFormComponent } from './iglesia-form/iglesia-form.component';
import { IglesiaEditarComponent } from './iglesia-editar/iglesia-editar.component';

export const IglesiaRoutes: Routes = [{
    path: '',
    children: [{
        path: 'iglesia',
        component: IglesiaComponent
    },{
        path: 'crear-iglesia',
        component: IglesiaFormComponent
    },{
        path: 'editar-iglesia/:id',
        component: IglesiaEditarComponent
    }]
}];

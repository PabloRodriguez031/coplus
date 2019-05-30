import { Routes } from '@angular/router';

import { GrupoComponent } from './grupo.component';
import { GrupoFormComponent } from './grupo-form/grupo-form.component';
import { GrupoEditarComponent } from './grupo-editar/grupo-editar.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';

export const GrupoRoutes: Routes = [{
    path: '',
    children: [{
        path: 'grupo',
        component: GrupoComponent
    },{
        path: 'crear-grupo',
        component: GrupoFormComponent
    },{
        path: 'editar-grupo/:id',
        component: GrupoEditarComponent
    },{
        path: 'agregar-usuario-grupo/:id',
        component: AgregarUsuarioComponent
    }]
}];

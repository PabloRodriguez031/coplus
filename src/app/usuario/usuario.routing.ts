import { Routes } from '@angular/router';

import { UsuarioComponent } from './usuario.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioEditarComponent } from './usuario-editar/usuario-editar.component';

export const UsuarioRoutes: Routes = [{
    path: '',
    children: [{
        path: 'usuario',
        component: UsuarioComponent
    },{
        path: 'crear-usuario',
        component: UsuarioFormComponent
    },{
        path: 'editar-usuario/:id',
        component: UsuarioEditarComponent
    }]
}];

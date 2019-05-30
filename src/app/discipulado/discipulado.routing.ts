import { Routes } from '@angular/router';

import { DiscipuladoComponent } from './discipulado.component';
import { DiscipuladoFormComponent } from './discipulado-form/discipulado-form.component';
import { DiscipuladoEditarComponent } from './discipulado-editar/discipulado-editar.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';

export const DiscipuladoRoutes: Routes = [{
    path: '',
    children: [{
        path: 'discipulado',
        component: DiscipuladoComponent
    },{
        path: 'crear-discipulado',
        component: DiscipuladoFormComponent
    },{
        path: 'editar-discipulado/:id',
        component: DiscipuladoEditarComponent
    },{
        path: 'agregar-usuario-discipulado/:id',
        component: AgregarUsuarioComponent
    }]
}];

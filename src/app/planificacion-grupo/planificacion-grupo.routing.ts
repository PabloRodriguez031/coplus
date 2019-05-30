import { Routes } from '@angular/router';

import { PlanificacionGrupoComponent } from './planificacion-grupo.component';
import { PlanificacionFormComponent } from './planificacion-form/planificacion-form.component';
import { PlanificacionEditarComponent } from './planificacion-editar/planificacion-editar.component';

export const PlanificacionGrupoRoutes: Routes = [{
    path: '',
    children: [{
        path: 'planificacion-grupo',
        component: PlanificacionGrupoComponent
    },{
        path: 'crear-planificacion-grupo',
        component: PlanificacionFormComponent
    },{
        path: 'editar-planificacion-grupo/:id',
        component: PlanificacionEditarComponent
    }]
}];

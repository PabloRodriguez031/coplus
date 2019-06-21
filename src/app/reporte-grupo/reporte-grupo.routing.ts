import { Routes } from '@angular/router';

import { ReporteGrupoComponent } from './reporte-grupo.component';
import { ReporteEditarComponent } from './reporte-editar/reporte-editar.component';
import { ReporteFormComponent } from './reporte-form/reporte-form.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';



export const ReporteGrupoRoutes: Routes = [{
    path: '',
    children: [{
        path: 'reporte-grupo',
        component: ReporteGrupoComponent
    },{
        path: 'crear-reporte',
        component: ReporteFormComponent
    },{
        path: 'editar-reporte/:id',
        component: ReporteEditarComponent
    },{
        path: 'asistencia-grupo/:id/:grupo',
        component: AsistenciaComponent
    }]
}];

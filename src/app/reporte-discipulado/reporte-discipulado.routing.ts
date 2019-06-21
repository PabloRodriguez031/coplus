import { Routes } from '@angular/router';

import { ReporteDiscipuladoComponent } from './reporte-discipulado.component';
import { ReporteEditarComponent } from './reporte-editar/reporte-editar.component';
import { ReporteFormComponent } from './reporte-form/reporte-form.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';




export const ReporteDiscipuladoRoutes: Routes = [{
    path: '',
    children: [{
        path: 'reporte-discipulado',
        component: ReporteDiscipuladoComponent
    },{
        path: 'crear-reporte-discipulado',
        component: ReporteFormComponent
    },{
        path: 'editar-reporte-discipulado/:id',
        component: ReporteEditarComponent
    },{
        path: 'asistencia-discipulado/:id/:discipulado',
        component: AsistenciaComponent
    }]
}];

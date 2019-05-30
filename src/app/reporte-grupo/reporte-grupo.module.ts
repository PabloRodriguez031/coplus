import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReporteGrupoComponent } from './reporte-grupo.component';
import { ReporteGrupoRoutes } from './reporte-grupo.routing';
import { ReporteEditarComponent } from './reporte-editar/reporte-editar.component';
import { ReporteFormComponent } from './reporte-form/reporte-form.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ReporteGrupoRoutes),
        FormsModule
    ],
    declarations: [ReporteGrupoComponent, ReporteEditarComponent, ReporteFormComponent, AsistenciaComponent]
})

export class ReporteGrupoModule {}

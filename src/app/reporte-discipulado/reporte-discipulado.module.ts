import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReporteEditarComponent } from './reporte-editar/reporte-editar.component';
import { ReporteFormComponent } from './reporte-form/reporte-form.component';
import { ReporteDiscipuladoRoutes } from './reporte-discipulado.routing';
import { ReporteDiscipuladoComponent } from './reporte-discipulado.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ReporteDiscipuladoRoutes),
        FormsModule
    ],
    declarations: [ReporteDiscipuladoComponent, ReporteEditarComponent, ReporteFormComponent, AsistenciaComponent]
})

export class ReporteDiscipuladoModule {}

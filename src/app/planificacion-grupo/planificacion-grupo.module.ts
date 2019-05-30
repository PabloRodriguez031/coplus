import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlanificacionGrupoRoutes } from './planificacion-grupo.routing';
import { PlanificacionGrupoComponent } from './planificacion-grupo.component';
import { PlanificacionFormComponent } from './planificacion-form/planificacion-form.component';
import { PlanificacionEditarComponent } from './planificacion-editar/planificacion-editar.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PlanificacionGrupoRoutes),
        FormsModule
    ],
    declarations: [PlanificacionGrupoComponent, PlanificacionFormComponent, PlanificacionEditarComponent]
})

export class PlanificacionGrupoModule {}
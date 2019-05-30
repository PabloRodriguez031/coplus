import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GrupoComponent } from './grupo.component';
import { GrupoRoutes } from './grupo.routing';
import { GrupoFormComponent } from './grupo-form/grupo-form.component';
import { GrupoEditarComponent } from './grupo-editar/grupo-editar.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(GrupoRoutes),
        FormsModule
    ],
    declarations: [GrupoComponent, GrupoFormComponent, GrupoEditarComponent, AgregarUsuarioComponent]
})

export class GrupoModule {}
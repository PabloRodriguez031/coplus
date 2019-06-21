import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GrupoComponent } from './grupo.component';
import { GrupoRoutes } from './grupo.routing';
import { GrupoFormComponent } from './grupo-form/grupo-form.component';
import { GrupoEditarComponent } from './grupo-editar/grupo-editar.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(GrupoRoutes),
        FormsModule,
        DataTablesModule,
        NgSelectModule
    ],
    declarations: [GrupoComponent, GrupoFormComponent, GrupoEditarComponent, AgregarUsuarioComponent]
})

export class GrupoModule {}
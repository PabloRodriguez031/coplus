import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DiscipuladoComponent } from './discipulado.component';
import { DiscipuladoRoutes } from './discipulado.routing';
import { DiscipuladoFormComponent } from './discipulado-form/discipulado-form.component';
import { DiscipuladoEditarComponent } from './discipulado-editar/discipulado-editar.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DiscipuladoRoutes),
        FormsModule,
        NgSelectModule,
        DataTablesModule
    ],
    declarations: [DiscipuladoComponent, DiscipuladoFormComponent, DiscipuladoEditarComponent, AgregarUsuarioComponent]
})

export class DiscipuladoModule {}
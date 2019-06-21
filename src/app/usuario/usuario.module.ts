import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsuarioComponent } from './usuario.component';
import { UsuarioRoutes } from './usuario.routing';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioEditarComponent } from './usuario-editar/usuario-editar.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UsuarioRoutes),
        FormsModule,
        DataTablesModule
    ],
    declarations: [UsuarioComponent, UsuarioFormComponent, UsuarioEditarComponent]
})

export class UsuarioModule {}

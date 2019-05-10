import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DiscipuladoComponent } from './discipulado.component';
import { DiscipuladoRoutes } from './discipulado.routing';
import { DiscipuladoFormComponent } from './discipulado-form/discipulado-form.component';
import { DiscipuladoEditarComponent } from './discipulado-editar/discipulado-editar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DiscipuladoRoutes),
        FormsModule
    ],
    declarations: [DiscipuladoComponent, DiscipuladoFormComponent, DiscipuladoEditarComponent]
})

export class DiscipuladoModule {}
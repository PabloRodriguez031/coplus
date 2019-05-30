import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PredicaRoutes } from './predica.routing';
import { PredicaComponent } from './predica.component';
import { PredicaFormComponent } from './predica-form/predica-form.component';
import { PredicaEditarComponent } from './predica-editar/predica-editar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PredicaRoutes),
        FormsModule
    ],
    declarations: [PredicaComponent, PredicaFormComponent, PredicaEditarComponent]
})

export class PredicaModule {}
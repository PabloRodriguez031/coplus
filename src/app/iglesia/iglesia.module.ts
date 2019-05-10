import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IglesiaComponent } from './iglesia.component';
import { IglesiaRoutes } from './iglesia.routing';
import { IglesiaFormComponent } from './iglesia-form/iglesia-form.component';
import { IglesiaEditarComponent } from './iglesia-editar/iglesia-editar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(IglesiaRoutes),
        FormsModule
    ],
    declarations: [IglesiaComponent, IglesiaFormComponent, IglesiaEditarComponent]
})

export class IglesiaModule {}
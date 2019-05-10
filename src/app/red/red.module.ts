import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RedComponent } from './red.component';
import { RedRoutes } from './red.routing';
import { RedFormComponent } from './red-form/red-form.component';
import { RedEditarComponent } from './red-editar/red-editar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(RedRoutes),
        FormsModule
    ],
    declarations: [RedComponent, RedFormComponent, RedEditarComponent]
})

export class RedModule {}

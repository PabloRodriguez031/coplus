import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AcademiaComponent } from './academia.component';
import { AcademiaRoutes } from './academia.routing';
import { AcademiaFormComponent } from './academia-form/academia-form.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AcademiaRoutes),
        FormsModule
    ],
    declarations: [AcademiaComponent, AcademiaFormComponent]
})

export class AcademiaModule {}
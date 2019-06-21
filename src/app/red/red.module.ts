import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RedComponent } from './red.component';
import { RedRoutes } from './red.routing';
import { RedFormComponent } from './red-form/red-form.component';
import { RedEditarComponent } from './red-editar/red-editar.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(RedRoutes),
        FormsModule,
        DataTablesModule,
        NgSelectModule
    ],
    declarations: [RedComponent, RedFormComponent, RedEditarComponent]
})

export class RedModule {}

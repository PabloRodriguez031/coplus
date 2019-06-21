import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PanelLightweekendComponent } from './panel-lightweekend.component';
import { PanellightweekendRoutes } from './panel-lightweekend.routing';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PanellightweekendRoutes),
        FormsModule,
        DataTablesModule
    ],
    declarations: [PanelLightweekendComponent]
})

export class PanellightweekendModule {}

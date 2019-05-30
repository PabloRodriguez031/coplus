import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PanelLightweekendComponent } from './panel-lightweekend.component';
import { PanellightweekendRoutes } from './panel-lightweekend.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PanellightweekendRoutes),
        FormsModule
    ],
    declarations: [PanelLightweekendComponent]
})

export class PanellightweekendModule {}

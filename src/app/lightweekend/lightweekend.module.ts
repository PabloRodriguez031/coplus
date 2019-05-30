import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LightweekendComponent } from './lightweekend.component';
import { LightweekendRoutes } from './lightweekend.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(LightweekendRoutes),
        FormsModule
    ],
    declarations: [LightweekendComponent]
})

export class LightweekendModule {}

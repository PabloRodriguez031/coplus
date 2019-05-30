import { Routes } from '@angular/router';

import { PanelLightweekendComponent } from './panel-lightweekend.component';

export const PanellightweekendRoutes: Routes = [{
    path: '',
    children: [{
        path: 'panel-lightweekend',
        component: PanelLightweekendComponent
    }]
}];

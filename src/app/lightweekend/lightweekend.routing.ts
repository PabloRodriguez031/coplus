import { Routes } from '@angular/router';

import { LightweekendComponent } from './lightweekend.component';

export const LightweekendRoutes: Routes = [{
    path: '',
    children: [{
        path: 'lightweekend',
        component: LightweekendComponent
    }]
}];

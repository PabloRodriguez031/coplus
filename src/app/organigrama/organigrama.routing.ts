import { Routes } from '@angular/router';

import { OrganigramaComponent } from './organigrama.component';

export const OrganigramaRoutes: Routes = [{
    path: '',
    children: [{
        path: 'organigrama',
        component: OrganigramaComponent
    }]
}];

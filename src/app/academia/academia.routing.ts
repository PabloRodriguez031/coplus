import { Routes } from '@angular/router';

import { AcademiaComponent } from './academia.component';

export const AcademiaRoutes: Routes = [{
    path: '',
    children: [{
        path: 'academia',
        component: AcademiaComponent
    }]
}];

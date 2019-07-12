import { Routes } from '@angular/router';

import { CalendarioComponent } from './calendario.component';

export const CalendarioRoutes: Routes = [{
    path: '',
    children: [{
        path: 'calendario',
        component: CalendarioComponent
    }]
}];

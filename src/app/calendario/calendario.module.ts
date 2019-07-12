import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarioComponent } from './calendario.component';
import { CalendarioRoutes } from './calendario.routing';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CalendarioRoutes),
        FormsModule,
        DataTablesModule
    ],
    declarations: [CalendarioComponent]
})

export class CalendarioModule {}
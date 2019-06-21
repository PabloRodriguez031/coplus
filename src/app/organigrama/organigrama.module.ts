import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrganigramaRoutes } from './organigrama.routing';
import { OrganigramaComponent } from './organigrama.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(OrganigramaRoutes),
    FormsModule
  ],
  declarations: [OrganigramaComponent]
})
export class OrganigramaModule { }





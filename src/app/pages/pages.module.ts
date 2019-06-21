import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagesRoutes } from './pages.routing';

import { RegisterComponent } from './register/register.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { LightweekendComponent } from './lightweekend/lightweekend.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        FormsModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        LockComponent,
        LightweekendComponent
    ]
})

export class PagesModule {}

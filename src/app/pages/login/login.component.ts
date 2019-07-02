import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
    moduleId:module.id,
    selector: 'login-cmp',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

    constructor(
      private router: Router,
      public authService: AuthService
      ) { }

    ngOnInit(){}

    recuperarPassword() {
      this.router.navigate(['/recuperacion-password'])
    }

    
}

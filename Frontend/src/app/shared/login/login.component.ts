import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../models/account.model';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  account: Account;

  constructor(private router: Router, private toastr: ToastrService, private loginService: LoginService,) { }

  ngOnInit() {
    this.account = new Account();
  }

  onSubmit(loginForm: NgForm) {
    if (this.account.username != null && this.account.password != null) {
      this.loginService.validateAccount(this.account.username, this.account.password).subscribe((data) => {
        var token = sessionStorage.getItem('token');
        var token_decode = jwt_decode(token);
        if (token_decode['admin'] == true) {
          console.log('Entre!')
          this.router.navigate(['/admin']);
        }
      }, error => {
        this.toastr.warning('Usuario o contraseña incorrectos', 'Error!', {
          closeButton: true,
        });
        loginForm.reset();
      });
    }
    else {
      this.toastr.warning('Usuario o contraseña no pueden ser vacio', 'Error!', {
        closeButton: true,
      });
      loginForm.reset();
    }
  }

}

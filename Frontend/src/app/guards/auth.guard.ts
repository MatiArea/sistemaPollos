import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate():boolean {
    var token = sessionStorage.getItem('token');
    var token_decode = jwt_decode(token);
    if(token_decode['admin'] == true){
      return true;
    }
  }
  
}

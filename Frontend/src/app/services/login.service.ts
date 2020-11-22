import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string;

  constructor(private http:HttpClient) { 
    this.url = 'http://127.0.0.1:4000';
  }

  validateAccount(username,password){
    const body = {
      username,
      password
    }
    return this.http.post(`${this.url}/user/login`,body).pipe( 
      map((data) => {
        this.guardarToken(data['token']);
        return data;       
      }));
  }

  logoutAccoun(){
    sessionStorage.removeItem('token')
  }

  private guardarToken(token:string){
    sessionStorage.setItem('token',token);
  }

}

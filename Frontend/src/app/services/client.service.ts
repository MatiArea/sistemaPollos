import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url:string

  constructor(private http: HttpClient) {
    this.url = 'http://127.0.0.1:4000';
  }

  getAllclients() {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/client/`, { headers }).pipe(data => {
      return data
    });
  }
}

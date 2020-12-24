import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  url:string;

  constructor( private http:HttpClient) { 
    this.url = 'http://127.0.0.1:4000';
  }

  dayReport(){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })
    
    return this.http.get(`${this.url}/report/dayreport`, { headers }).pipe(data => {
      return data
    });
  }
}

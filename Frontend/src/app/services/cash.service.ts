import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CashService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://127.0.0.1:4000';
  }

  getValueCash() {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/cash/`, { headers }).pipe(data => {
      return data
    });
  }

  changeValue(cashAmount:number){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    const body = {
      amount:cashAmount
    }
    
    return this.http.put(`${this.url}/cash/update`,body,{ headers }).pipe(data => {
      return data
    });
  }
}

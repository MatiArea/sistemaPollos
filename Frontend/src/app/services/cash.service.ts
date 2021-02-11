import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cash } from '../models/cash.model';
import  { Url } from '../models/url'

@Injectable({
  providedIn: 'root'
})
export class CashService {

  url: string = Url;

  constructor(private http: HttpClient) {
  }

  getValueCash() {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/cash`, { headers }).pipe(data => {
      return data
    });
  }

  addCash(cashAmount:number){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    const body = {
      amount:cashAmount
    }
    
    return this.http.put(`${this.url}/cash/add`,body,{ headers }).pipe(data => {
      return data
    });
  }

  removeCash(cashAmount:number){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    const body = {
      amount:cashAmount
    }
    
    return this.http.put(`${this.url}/cash/remove`,body,{ headers }).pipe(data => {
      return data
    });
  }

  validateCash(cash:Cash){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })
    const body = cash

    return this.http.post(`${this.url}/cash/validate`,body,{ headers }).pipe(data => {
      return data
    });
  }
}

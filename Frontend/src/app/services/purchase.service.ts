import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://127.0.0.1:4000';
  }

  createPurchase(purchase:any){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    const body = purchase

    return this.http.post(`${this.url}/purchase/new`,body,{headers}).pipe( data => {
      return data
    })
  }
  
  getAllPurchase(){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/purchase`,{headers}).pipe(purchases =>{
      return purchases
    })
  }

  getOnePurchase(id:number){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/purchase/${id}`,{headers}).pipe(purchase =>{
      return purchase
    })
  }

  deletePurchase(id:number){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.delete(`${this.url}/purchase/delete/${id}`,{headers}).pipe(purchase =>{
      return purchase
    })
  }

}

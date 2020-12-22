import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  url:string;

  constructor( private http:HttpClient) { 
    this.url = 'http://127.0.0.1:4000';
  }

  getAllsales() {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/sale/`, { headers }).pipe(data => {
      return data
    });
  }

  getOneSale(id:number){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/sale/${id}`, { headers }).pipe(data => {
      return data
    });
  }

  createSale(sale:any){
    let itemsSales = []
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    sale.items.forEach(item => {
      let itemSale = {
        id_product: item.product.id_product,
        quantity: item.quantity
      }
      itemsSales.push(itemSale)
    });

    sale.items = itemsSales

    let body = sale

    return this.http.post(`${this.url}/sale/new`,body,{ headers }).pipe(data => {
      return data
    });
  }

  deleteSale(idSale:number){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.delete(`${this.url}/sale/delete/${idSale}`, { headers }).pipe(data => {
      return data
    });
  }
}

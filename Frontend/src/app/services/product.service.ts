import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://127.0.0.1:4000';
  }

  getAllProducts() {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/product/`, { headers }).pipe(data => {
      return data
    });
  }

  createProduct(product:any){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    const body = {
      code: product.code,
      name: product.name,
    }

    return this.http.post(`${this.url}/product/new`,body,{headers}).pipe( data => {
      return data
    })
  }

  getOneProduct(id:number){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/product/${id}`, { headers }).pipe(data => {
      return data
    })
  }

  editProduct(product:Product){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    const body = {
      id: product.id_product,
      code: product.code,
      name: product.name,
      stock: product.stock,
      sale_price : product.sale_price
    }
    
    return this.http.put(`${this.url}/product/update`, body ,{ headers }).pipe(data => {
      return data
    })

  }

  deleteProduct(idProduct:number){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.delete(`${this.url}/product/delete/${idProduct}`,{ headers }).pipe(data => {
      return data
    })
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
}

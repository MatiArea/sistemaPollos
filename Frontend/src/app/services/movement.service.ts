import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movement } from '../models/movement.model';
import { Url } from '../models/url';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  url: string = Url;

  constructor(private http: HttpClient) {
  }

  getAllMovements(page:number) {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/movement/all/${page}`, { headers }).pipe(data => {
      return data
    });
  }

  createMovement(movement:Movement){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    const body = {
      date: movement.date,
      id_client: movement.client,
      total: movement.amount
    }
    return this.http.post(`${this.url}/movement/new`,body,{headers}).pipe( data => {
      return data
    })
  }  
}

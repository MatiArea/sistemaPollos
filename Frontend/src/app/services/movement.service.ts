import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movement } from '../models/movement.model';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://127.0.0.1:4000';
  }

  getAllMovements() {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/movement/`, { headers }).pipe(data => {
      return data
    });
  }

  getOneMovement(id:number){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/movement/${id}`, { headers }).pipe(data => {
      return data
    })
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

  deleteMovement(idMovement:number){
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.delete(`${this.url}/movement/delete/${idMovement}`,{ headers }).pipe(data => {
      return data
    })
  }
  
}

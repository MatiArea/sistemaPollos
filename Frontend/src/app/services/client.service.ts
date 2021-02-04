import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ɵConsole } from '@angular/core';
import { map } from 'rxjs/operators';
import { Client } from '../models/client.model';
import { Url } from '../models/url';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url: string = Url

  constructor(private http: HttpClient) {
  }

  getAllClientsTable(page:number) {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/client/all/${page}`, { headers }).pipe(data => {
      return data
    });
  }

  getAllClients() {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/client`, { headers }).pipe(data => {
      return data
    });
  }

  createClient(client: Client) {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    const body = {
      name: client.name,
      address: client.address,
    }

    return this.http.post(`${this.url}/client/new`, body, { headers }).pipe(data => {
      return data
    });
  }

  getOneClient(id_client: number) {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.get(`${this.url}/client/${id_client}`, { headers }).pipe(data => {
      return data
    });
  }

  editClient(client: Client) {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    const body = {
      id: client.id_client,
      name: client.name,
      address: client.address,
      balance: client.balance
    }

    return this.http.put(`${this.url}/client/update`, body, { headers }).pipe(data => {
      return data
    });
  }

  deleteClient(id_client: number) {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    return this.http.delete(`${this.url}/client/delete/${id_client}`, { headers }).pipe(data => {
      return data
    });
  }

  updateBalance(id_client: number, amount: number) {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString
    })

    const body = {
      idClient: id_client,
      amount
    }

    return this.http.put(`${this.url}/client/updatebalance`, body, { headers }).pipe(data => {
      return data
    })
  }

  createPDF() {
    const token = sessionStorage.getItem('token');
    const tokenString = 'Bearer ' + token

    const headers = new HttpHeaders({
      'Authorization': tokenString,
      'Accept':'application/pdf'
    })

    return this.http.post(`${this.url}/client/downloadlist`, {}, { headers, responseType: 'blob' }).pipe(map((data) => {
      return data
    }));
  }

}

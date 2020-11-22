import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client:any;
  clients:any;

  constructor(private clientService:ClientService) { }

  ngOnInit(): void {
    //this.client = new Client();
    this.getAllClients();
  }
  
  getAllClients(){
    this.clientService.getAllclients().subscribe(clients => {
      this.clients = clients['clients']
    });
  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../../../models/client.model';
import { ClientService } from '../../../services/client.service';
import { saveAs } from "file-saver"
import { Router } from '@angular/router';
// const FileSaver = require('file-saver');

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client:any;
  clientToEdit:any;
  clients:any;

  constructor(private clientService:ClientService,private router:Router,private toastr:ToastrService) { 
    this.client = new Client()
    this.clientToEdit = new Client()
  }

  @ViewChild('editClientModal', {static: false}) public editClientModal: ModalDirective;
  @ViewChild('newClientModal', {static: false}) public newClientModal: ModalDirective;


  ngOnInit(): void {
    this.getAllClients();
  }
  
  getAllClients(){
    this.clientService.getAllClients().subscribe(clients => {
      this.clients = clients['clients']
    });
  }

  createClient(createForm:NgForm){
    this.clientService.createClient(this.client).subscribe( data => {
      
      this.toastr.success('Cliente creado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.newClientModal.hide();      
      createForm.reset();
      this.client = new Client();
      this.getAllClients();

    },(error)=>{
      if(error){
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude crear el cliente', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  getOneClient(client:Client){
    this.clientService.getOneClient(client.id_client).subscribe( clientToEdit => {
      this.clientToEdit = clientToEdit['client']
    })
    this.editClientModal.show()
  }

  editClient(editForm:NgForm){
    this.clientService.editClient(this.clientToEdit).subscribe( data => {
      
      this.toastr.success('Cliente actualizado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.editClientModal.hide();      
      editForm.reset();
      this.clientToEdit = new Client();
      this.getAllClients();

    },(error)=>{
      if(error){
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude actualizar el cliente', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  deleteClient(clientDelete: Client) {
    this.clientService.deleteClient(clientDelete.id_client).subscribe( data => {
      this.toastr.success('Cliente eliminado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.getAllClients();
    }, (error) => {
      if(error){
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude eliminar el Cliente', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  downloadPdf(){
    this.clientService.createPDF().subscribe(response => {
      saveAs(response, `ListaClientes.pdf`);
    });
  } 


}

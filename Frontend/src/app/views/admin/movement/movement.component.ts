import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Movement } from '../../../models/movement.model';
import { ClientService } from '../../../services/client.service';
import { MovementService } from '../../../services/movement.service';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit {

  movement: Movement
  oneMovement: Movement
  movements: []
  clientId: number
  clients: []

  constructor(private clientService:ClientService, private toastr:ToastrService, private movementService:MovementService) { 

    this.movement = new Movement()

  }

  @ViewChild('editMovementModal', {static: false}) public editMovementModal: ModalDirective;
  @ViewChild('newMovementModal', {static: false}) public newMovementModal: ModalDirective;

  ngOnInit(): void {
    this.getAllMovements()
  }
  
  getAllClients(){
    this.clientService.getAllClients().subscribe(clients => {
      this.clients = clients['clients']
    });
  }

  getAllMovements(){
    this.movementService.getAllMovements().subscribe(movements =>{
      this.movements = movements['movements']
    })
    
  }

  getOneMovement(movement:Movement){
    // this.movementService.getOneMovement().subscribe(movement => {
    //   this.oneMovement = movement
    // })
  }


  clientSelected(id:number){
    this.clientId = id
  }

  openNewMovementModal(){
    this.clientId = 0
    this.getAllClients()
    this.newMovementModal.show()
  }


  createMovement(createForm:NgForm){
    this.movement.client = this.clientId
    this.movementService.createMovement(this.movement).subscribe( data => {
      
      this.toastr.success('Movimiento creado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.newMovementModal.hide();      
      createForm.reset();
      this.movement = new Movement();
      this.getAllMovements();

    },(error)=>{
      if(error){
        this.toastr.error('No se pude cargar el componente', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  deleteMovement(movementDelet:Movement){
    this.movementService.deleteMovement(movementDelet.id_movement).subscribe( data => {
      this.toastr.success('Movimiento eliminado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.getAllMovements();
    }, (error) => {
      if(error){
        this.toastr.error('No se pude eliminar el movimiento', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

}

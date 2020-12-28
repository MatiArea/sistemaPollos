import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  cargandoCreateMovement:boolean

  constructor(private clientService: ClientService, private router: Router, private toastr: ToastrService, private movementService: MovementService) {

    this.movement = new Movement()

  }

  @ViewChild('editMovementModal', { static: false }) public editMovementModal: ModalDirective;
  @ViewChild('newMovementModal', { static: false }) public newMovementModal: ModalDirective;

  ngOnInit(): void {
    this.getAllMovements()
  }

  getAllClients() {
    this.clientService.getAllClients().subscribe(clients => {
      this.clients = clients['clients']
    });
  }

  getAllMovements() {
    this.movementService.getAllMovements().subscribe(movements => {
      this.movements = movements['movements']
    })

  }

  clientSelected(id: number) {
    this.clientId = id
  }

  openNewMovementModal() {
    this.getAllClients()
    this.clientId = 0
    this.newMovementModal.show()
  }


  createMovement(createForm: NgForm) {
    this.cargandoCreateMovement = true
    if (this.clientId != 0) {
      this.movement.client = this.clientId

      this.movementService.createMovement(this.movement).subscribe(data => {
        this.clientService.updateBalance(this.clientId, this.movement.amount).subscribe(dataClient => {
          this.cargandoCreateMovement = false
          this.toastr.success('Movimiento creado con exito', 'Exito!', {
            closeButton: true,
            progressBar: true
          });
          createForm.reset();
          this.newMovementModal.hide();
          this.movement = new Movement();
          this.getAllMovements();

        }, (error) => {
          if (error) {
            this.cargandoCreateMovement = false
            if (error.code === 403) {
              this.router.navigate(['login']);
            }
            this.toastr.error('No se pude cargar el movimiento', 'Error!', {
              closeButton: true,
              progressBar: true
            });
          }
        })
      }, (error) => {
        if (error) {
          this.cargandoCreateMovement = false
          if (error.code === 403) {
            this.router.navigate(['login']);
          }
          this.toastr.error('No se pude cargar el movimiento', 'Error!', {
            closeButton: true,
            progressBar: true
          });
        }
      })
    } else {
      this.cargandoCreateMovement = false
      this.toastr.error('No se pude cargar el movimiento', 'Error!', {
        closeButton: true,
        progressBar: true
      });
    }
  }

}

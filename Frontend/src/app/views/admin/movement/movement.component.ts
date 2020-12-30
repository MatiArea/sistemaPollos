import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Movement } from '../../../models/movement.model';
import { ClientService } from '../../../services/client.service';
import { MovementService } from '../../../services/movement.service';
import localeIt from '@angular/common/locales/it'
import { registerLocaleData } from '@angular/common';
import { NgForm } from '@angular/forms';
registerLocaleData(localeIt, 'it');

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
  cargandoMovement:boolean
  page:number

  constructor(private clientService: ClientService, private router: Router, private toastr: ToastrService, private movementService: MovementService) {

    this.movement = new Movement()

  }

  @ViewChild('editMovementModal', { static: false }) public editMovementModal: ModalDirective;
  @ViewChild('newMovementModal', { static: false }) public newMovementModal: ModalDirective;

  ngOnInit(): void {
    this.page = 0
    this.getAllMovements()
  }

  getAllClients() {
    this.clientService.getAllClients().subscribe(clients => {
      this.clients = clients['clients']
    });
  }

  changePage(numPage:number){
    if(numPage >= 0){
      this.page = numPage
      this.getAllMovements()
    }
  }

  getAllMovements() {
    this.movementService.getAllMovements(this.page).subscribe(movements => {
      this.movements = movements['movements']
    })

  }

  clientSelected(id: number) {
    this.clientId = id
  }

  openNewMovementModal() {
    this.getAllClients()
    this.clientId = 0
    this.movement.date = new Date().toISOString().split('T')[0]
    this.newMovementModal.show()
  }


  createMovement(createForm: NgForm) {
    this.cargandoMovement = true
    if (this.clientId != 0) {
      this.movement.client = this.clientId

      this.movementService.createMovement(this.movement).subscribe(data => {
        this.clientService.updateBalance(this.clientId, this.movement.amount).subscribe(dataClient => {
          this.cargandoMovement = false
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
            this.cargandoMovement = false
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
          this.cargandoMovement = false
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
      this.cargandoMovement = false
      this.toastr.error('No se pude cargar el movimiento', 'Error!', {
        closeButton: true,
        progressBar: true
      });
    }
  }

}

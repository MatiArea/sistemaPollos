import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Cash } from '../../../models/cash.model';
import { CashService } from '../../../services/cash.service';
import { Router } from '@angular/router';
import localeIt from '@angular/common/locales/it'
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent implements OnInit {

  valueCash: number
  valueCashInit: number
  value: number
  valueDelete: number
  cash: Cash
  total: number
  difValue: number
  message: any
  cargandoCloseCash: boolean
  cargandoUpdateCash: boolean
  cargandoDeleteCash: boolean
  cantidad: string


  constructor(private cashService: CashService,
    private router: Router,
    private toastr: ToastrService) {
    this.cash = new Cash()
  }

  @ViewChild('addModal', { static: false }) public addModal: ModalDirective;
  @ViewChild('deleteModal', { static: false }) public deleteModal: ModalDirective;
  @ViewChild('errorModal', { static: false }) public errorModal: ModalDirective;
  @ViewChild('countModal', { static: false }) public countModal: ModalDirective;



  ngOnInit(): void {
    this.getValueCash()
  }

  getValueCash() {
    this.cashService.getValueCash().subscribe(cash => {
      if (cash['cash']) {
        this.valueCash = cash['cash'].amount
      }
      else {
        this.valueCash = 0
      }
    })
  }

  calcular() {
    let total = this.cash.b10 * 10 + this.cash.b20 * 20 + this.cash.b50 * 50 + this.cash.b100 * 100 + this.cash.b200 * 200 + this.cash.b500 * 500 + this.cash.b1000 * 1000
    this.cantidad = `Se ingresaron $ ${total} en el conteo de billetes`

    this.countModal.show()
  }

  addCashValue(form: any) {
    this.cargandoUpdateCash = true
    this.cashService.addCash(this.value).subscribe(cash => {
      this.cargandoUpdateCash = false
      this.toastr.success('Caja actualizada con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.getValueCash();
      form.reset()
      this.value = 0
      this.addModal.hide()

    }, (error) => {
      this.cargandoUpdateCash = false
      if (error) {
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude actualizar la caja', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  withdrawMoneyValue(form: any) {
    this.cargandoDeleteCash = true
    this.cashService.removeCash(this.valueDelete).subscribe(cash => {
      this.cargandoDeleteCash = false
      this.toastr.success('Caja actualizada con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.getValueCash();
      form.reset()
      this.valueDelete = 0
      this.deleteModal.hide()

    }, (error) => {
      this.cargandoDeleteCash = false
      if (error) {
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude actualizar la caja', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  close(form: any) {
    this.cargandoCloseCash = true
    this.cashService.getValueCash().subscribe(cash => {
      this.cargandoCloseCash = false
      this.total = this.cash.b10 * 10 + this.cash.b20 * 20 + this.cash.b50 * 50 + this.cash.b100 * 100 + this.cash.b200 * 200 + this.cash.b500 * 500 + this.cash.b1000 * 1000
      if (cash['cash'][1].amount === this.total) {
        // this.cashService.changeValue(cash['cash'][1].amount).subscribe(data => {
        //   this.toastr.success('Caja validada con exito', 'Exito!', {
        //     closeButton: true,
        //     progressBar: true
        //   });
        //   this.getValueCash();
        //   form.reset()
        //   this.cash = new Cash()
        // }, (error) => {
        //   if (error) {
        //     if (error.code === 403) {
        //       this.router.navigate(['login']);
        //     }
        //     this.toastr.error('No se pude validar la caja', 'Error!', {
        //       closeButton: true,
        //       progressBar: true
        //     });
        //   }
        // })
      }
      else {
        this.cargandoCloseCash = false
        this.difValue = cash['cash'][1].amount - this.total
        if (this.difValue > 0) {
          this.message = `El sistema tiene cargado $ ${this.difValue} extras`
        }
        else {
          this.message = `Faltan cargar $ ${this.difValue} en el sistema`
        }
        this.errorModal.show()
      }
    }, (error) => {
      if (error) {
        this.cargandoCloseCash = false
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude actualizar la caja', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

}

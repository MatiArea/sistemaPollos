import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Cash } from '../../../models/cash.model';
import { CashService } from '../../../services/cash.service';
import { MovementService } from '../../../services/movement.service';
import { PurchaseService } from '../../../services/purchase.service';
import { SaleService } from '../../../services/sale.service';
import { ExpenseService } from '../../../services/expense.service';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent implements OnInit {

  valueCash: number
  valueCashInit: number
  value: number
  cash: Cash
  total: number
  difValue:number
  message: any


  constructor(private cashService: CashService,

    private toastr: ToastrService) {
    this.cash = new Cash()
  }

  @ViewChild('updateModal', { static: false }) public updateModal: ModalDirective;
  @ViewChild('errorModal', { static: false }) public errorModal: ModalDirective;


  ngOnInit(): void {
    this.getValueCash()
  }

  getValueCash() {
    this.cashService.getValueCash().subscribe(cash => {
      console.log(cash)
      if (cash['cash'].length === 0) {
        this.valueCash = 0
        this.valueCashInit = 0
      }
      else {
        this.valueCashInit = cash['cash'][0].amount
        this.valueCash = cash['cash'][1].amount
      }
    })
  }

  updateCashValue(form: any) {
    this.cashService.changeValue(this.value).subscribe(cash => {
      this.toastr.success('Caja actualizada con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.getValueCash();
      form.reset()
      this.updateModal.hide()

    }, (error) => {
      if (error) {
        this.toastr.error('No se pude actualizar la caja', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  close(form: any) {
    this.cashService.getValueCash().subscribe(cash => {
      this.total = this.cash.b10 * 10 + this.cash.b20 * 20 + this.cash.b50 * 50 + this.cash.b100 * 100 + this.cash.b500 * 500 + this.cash.b1000 * 1000
      if (cash['cash'][1].amount === this.total) {
        this.cashService.changeValue(cash['cash'][1].amount).subscribe( data => {
          this.toastr.success('Caja validada con exito', 'Exito!', {
            closeButton: true,
            progressBar: true
          });
          this.getValueCash();
          form.reset()
          this.cash = new Cash()
        }, (error) => {
          if (error) {
            this.toastr.error('No se pude validar la caja', 'Error!', {
              closeButton: true,
              progressBar: true
            });
          }
        })
      }
      else{
        this.difValue = cash['cash'][1].amount - this.total
        if(this.difValue > 0 ){
          this.message = `El sistema tiene cargado $ ${this.difValue} extras`
        }
        else{
          this.message = `Faltan cargar $ ${this.difValue} en el sistema`
        }
        this.errorModal.show()
      }
    }, (error) => {
      if (error) {
        this.toastr.error('No se pude actualizar la caja', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

}

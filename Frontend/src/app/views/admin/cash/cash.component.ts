import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CashService } from '../../../services/cash.service';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent implements OnInit {

  valueCash: any
  value: number

  constructor(private cashService: CashService, private toastr: ToastrService) { 
  }

  @ViewChild('updateModal', { static: false }) public updateModal: ModalDirective;

  ngOnInit(): void {
    this.getValueCash()
  }

  getValueCash(){
    this.cashService.getValueCash().subscribe(cash =>{
      if(cash['cash'] === null){
        this.valueCash = "No hay valor definido"
      }
      else{
        this.valueCash = cash['cash'].amount
      }
    })
  }
  
  updateCashValue(form:any){
    this.cashService.changeValue(this.value).subscribe(cash =>{
      this.toastr.success('Caja actualizada con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.getValueCash();
      form.reset()
      this.updateModal.hide()

    },(error)=>{
      if(error){
        this.toastr.error('No se pude actualizar la caja', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  close(form:any){
    
  }

}

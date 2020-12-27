import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { SaleComponent } from './sale/sale.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { MovementComponent } from './movement/movement.component';
import { ExpenseComponent } from './expense/expense.component';
import { CashComponent } from './cash/cash.component';
import { GeneralRoutingModule } from './general.routes';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    ClientComponent,
    SaleComponent,
    PurchaseComponent,
    MovementComponent,
    ExpenseComponent,
    CashComponent,    
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    FormsModule,
    ModalModule.forRoot()
  ]
})
export class GeneralModule { }

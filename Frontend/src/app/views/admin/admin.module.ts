import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routes';
import { DashboardModule } from '../../shared/dashboard/dashboard.module';
import { ClientComponent } from './client/client.component';
import { ProductComponent } from './product/product.component';
import { FormsModule } from '@angular/forms';
import { SaleComponent } from './sale/sale.component';

import { ModalModule } from 'ngx-bootstrap/modal';




@NgModule({
  declarations: [
    ClientComponent,
    ProductComponent,
    SaleComponent
  ],
  imports: [
    CommonModule,
    DashboardModule,
    AdminRoutingModule,
    FormsModule,
    ModalModule.forRoot()
  ]
})
export class AdminModule { }

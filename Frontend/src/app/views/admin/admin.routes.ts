import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import Components
import { ClientComponent } from './client/client.component';
import { ProductComponent } from './product/product.component';
import { SaleComponent } from './sale/sale.component';


export const routes: Routes = [
  {
    path:'ventas',
    component: SaleComponent,
    data: {
      title:'Ventas'
    }
  },
  {
    path: 'clientes',
    component: ClientComponent,
    data: {
      title: 'Cliente'
    }
  },
  {
    path: 'productos',
    component: ProductComponent,
    data: {
      title: 'Productos'
    }
  },
  {
    path: 'informes',
    component: ProductComponent,
    data: {
      title: 'Register Page'
    }
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {}

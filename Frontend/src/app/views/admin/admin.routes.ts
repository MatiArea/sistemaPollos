import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

//import Components
import { ClientComponent } from './client/client.component';
import { ProductComponent } from './product/product.component';
import { SaleComponent } from './sale/sale.component';
import { PurchaseComponent } from './purchase/purchase.component'
import { MovementComponent } from './movement/movement.component';
import { ExpenseComponent } from './expense/expense.component';


export const routes: Routes = [
  {
    path:'ventas',
    component: SaleComponent,
    data: {
      title:'Ventas'
    }
  },
  {
    path:'compras',
    component: PurchaseComponent,
    data: {
      title:'Compras'
    }
  },
  {
    path: 'clientes',
    data: {
      title: 'Clientes'
    },
    children: [
      {
        path: 'listado',
        component: ClientComponent,
        data: {
          title: 'Clientes / Listado'
        }
      },
      {
        path: 'movimientos',
        component: MovementComponent,
        data: {
          title: 'Clientes / Movimientos'
        }
      },
    ]
  },
  {
    path: 'productos',
    component: ProductComponent,
    data: {
      title: 'Productos'
    }
  },
  {
    path:'gastos',
    component: ExpenseComponent,
    data:{
      title:'Gastos'
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

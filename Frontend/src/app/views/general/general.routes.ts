import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

//import Components
import { ClientComponent } from './client/client.component';
import { SaleComponent } from './sale/sale.component';
import { PurchaseComponent } from './purchase/purchase.component'
import { MovementComponent } from './movement/movement.component';
import { ExpenseComponent } from './expense/expense.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ventas',
    pathMatch: 'full'
  },
  {
    path: 'ventas',
    component: SaleComponent,
    data: {
      title: 'Ventas'
    }
  },
  {
    path: 'compras',
    component: PurchaseComponent,
    data: {
      title: 'Compras'
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
    path: 'gastos',
    component: ExpenseComponent,
    data: {
      title: 'Gastos'
    }
  }
  // {
  //   path: 'caja',
  //   component: CashComponent,
  //   data: {
  //     title: 'Caja'
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }

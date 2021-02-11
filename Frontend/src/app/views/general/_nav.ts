import { INavData } from '@coreui/angular';

export const generalNavItems: INavData[] = [
  {
    name: 'Ventas',
    url: '/general/ventas',
    icon: 'fas fa-dollar-sign'
  },
  {
    name: 'Compras',
    url: '/general/compras',
    icon: 'fas fa-credit-card'
  },
  {
    name: 'Clientes',
    url: '/general/clientes',
    icon: 'fas fa-user-friends',
    children: [
      {
        name: 'Listado',
        url: '/general/clientes/listado',
        icon: 'icon-star'
      },
      {
        name: 'Movimientos',
        url: '/general/clientes/movimientos',
        icon: 'icon-star'
      },
    ]
  },
  {
    name: 'Gastos',
    url: '/general/gastos',
    icon: 'fas fa-credit-card'
  }
  // {
  //   name: 'Caja',
  //   url: '/general/caja',
  //   icon: 'fas fa-cash-register'
  // }
];

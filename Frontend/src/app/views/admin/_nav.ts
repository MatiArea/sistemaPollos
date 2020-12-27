import { INavData } from '@coreui/angular';

export const adminNavItems: INavData[] = [
  {
    name: 'Ventas',
    url: '/admin/ventas',
    icon: 'fas fa-dollar-sign'
  },
  {
    name: 'Compras',
    url: '/admin/compras',
    icon: 'fas fa-credit-card'
  },
  {
    name: 'Clientes',
    url: '/admin/clientes',
    icon: 'fas fa-user-friends',
    children: [
      {
        name: 'Listado',
        url: '/admin/clientes/listado',
        icon: 'icon-star'
      },
      {
        name: 'Movimientos',
        url: '/admin/clientes/movimientos',
        icon: 'icon-star'
      },
    ]
  },
  {
    name: 'Productos',
    url: '/admin/productos',
    icon: 'fas fa-shopping-cart'
  },
  {
    name: 'Gastos',
    url: '/admin/gastos',
    icon: 'fas fa-credit-card'
  },
  {
    name: 'Caja',
    url: '/admin/caja',
    icon: 'fas fa-cash-register'
  },
  {
    name: 'Informes',
    url: '/admin/informes',
    icon: 'fas fa-chart-pie',
  }
];

import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Ventas',
    url: '/admin/ventas',
    icon: 'fas fa-dollar-sign'
  },
  {
    name: 'Compras',
    url: '/admin/compras',
    icon: 'icon-credit-card'
  },
  {
    name: 'Clientes',
    url: '/admin/clientes',
    icon: 'icon-people',
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
    icon: 'icon-basket-loaded'
  },
  {
    name: 'Gastos',
    url: '/admin/gastos',
    icon: 'icon-credit-card'
  },
  {
    name: 'Caja',
    url: '/admin/caja',
    icon: 'icon-credit-card'
  },
  {
    name: 'Informes',
    url: '/admin/informes',
    icon: 'icon-chart',
    children: [
      {
        name: 'Diario',
        url: '/admin/diario',
        icon: 'icon-star'
      },
      {
        name: 'Semanal',
        url: '/admin/semanal',
        icon: 'icon-star'
      },
      {
        name: 'Mensual',
        url: '/admin/mensual',
        icon: 'icon-star'
      }
    ]
  }
];

import { DashboardPages } from '@shared/application/pages';

export const NAVBAR_ITEMS = [
  {
    title: 'Razas',
    links: [
      {
        label: 'Perros',
        href: DashboardPages.breeds.replace(':petType', 'dog'),
      },
      {
        label: 'Gatos',
        href: DashboardPages.breeds.replace(':petType', 'cat'),
      },
    ],
  },
];
